// import express from "express"
// import ReviewsCtrl from "./reviews.controller.js"

// const router = express.Router()

// router.route("/movie/:id").get(ReviewsCtrl.apiGetReviews)
// router.route("/new").post(ReviewsCtrl.apiPostReview)
// router.route("/:id")
//   .get(ReviewsCtrl.apiGetReview)
//   .put(ReviewsCtrl.apiUpdateReview)
//   .delete(ReviewsCtrl.apiDeleteReview)

// export default router
import express from "express"
import ReviewsCtrl from "./reviews.controller.js"

const router = express.Router()


router.post("/new", ReviewsCtrl.apiPostReview)
router.post("/", ReviewsCtrl.apiPostReview)


router.get("/movie/:id", ReviewsCtrl.apiGetReviews)


router.get("/:id", ReviewsCtrl.apiGetReview)
router.put("/:id", ReviewsCtrl.apiUpdateReview)
router.delete("/:id", ReviewsCtrl.apiDeleteReview)

export default router