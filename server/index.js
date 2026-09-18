import app from "./server.js"
import mongodb from "mongodb"
import ReviewsDAO from "./dao/reviewsDAO.jS"
import dotenv from "dotenv"

dotenv.config()

const MongoClient = mongodb.MongoClient
const mongo_username = process.env['MONGO_USERNAME']
const mongo_password = process.env['MONGO_PASSWORD']

const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.iaaqbxv.mongodb.net/?appName=Cluster0`

let isConnected = false

async function connectDB() {
  if (isConnected) return
  const client = await MongoClient.connect(uri, { maxPoolSize: 50 })
  await ReviewsDAO.injectDB(client)
  isConnected = true
}

export default async function handler(req, res) {
  await connectDB()
  return app(req, res)
}