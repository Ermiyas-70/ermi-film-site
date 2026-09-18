import app from "./server.js"
import mongodb from "mongodb"
import ReviewsDAO from "./dao/reviewsDAO.js"
import dotenv from "dotenv"

dotenv.config()

const MongoClient = mongodb.MongoClient
const mongo_username = process.env.MONGO_USERNAME
const mongo_password = process.env.MONGO_PASSWORD

const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.iaaqbxv.mongodb.net/?appName=Cluster0`

// 1. የ MongoDB connection በካሽ (cache) ለመያዝ
let cachedClient = null

async function connectDB() {
  if (cachedClient) {
    return cachedClient
  }

  const client = await MongoClient.connect(uri, {
    maxPoolSize: 50,
    wtimeoutMS: 2500,
  })

  await ReviewsDAO.injectDB(client)
  cachedClient = client
  return cachedClient
}

// 2. እያንዳንዱ request ከመሄዱ በፊት Database መገናኘቱን ያረጋግጣል
app.use(async (req, res, next) => {
  try {
    await connectDB()
    next()
  } catch (err) {
    console.error("MongoDB Connection Error:", err)
    res.status(500).json({ error: "Database connection failure" })
  }
})

// 3. ለ Local Testing (በኮምፒውተርህ ላይ ብቻ እንዲሰራ)
if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 8000
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
  })
}

// 4. ለ Vercel Serverless Deployment አስፈላጊው export
export default app