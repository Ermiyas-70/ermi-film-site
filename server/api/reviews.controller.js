import ReviewsDAO from "../dao/reviewsDAO.js"

export default class ReviewsController {
  // 1. አዲስ Review ለመጻፍ (POST)
  static async apiPostReview(req, res, next) {
    try {
      const movieId = req.body.movieId
      const review = req.body.review
      const user = req.body.user

      const reviewResponse = await ReviewsDAO.addReview(
        movieId,
        user,
        review
      )
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  // 2. የአንድን ፊልም Reviews በሙሉ በ Movie ID ለማውጣት (GET)
  static async apiGetReviews(req, res, next) {
    try {
      let id = req.params.id || {}
      let reviews = await ReviewsDAO.getReviewsByMovieId(id)

      if (!reviews) {
        res.status(404).json({ error: "Not found" })
        return
      }

      if (reviews.error) {
        res.status(400).json({ error: reviews.error })
        return
      }

      res.json(reviews)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e.message })
    }
  }

  // 3. አንድን Review በራሱ ObjectId ለመውሰድ (GET)
  static async apiGetReview(req, res, next) {
    try {
      let id = req.params.id || {}
      let review = await ReviewsDAO.getReview(id)
      if (!review) {
        res.status(404).json({ error: "Not found" })
        return
      }
      if (review.error) {
        res.status(400).json({ error: review.error })
        return
      }
      res.json(review)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e.message })
    }
  }

  // 4. Review ለማስተካከል (PUT)
  static async apiUpdateReview(req, res, next) {
    try {
      const reviewId = req.params.id
      const review = req.body.review
      const user = req.body.user

      const reviewResponse = await ReviewsDAO.updateReview(
        reviewId,
        user,
        review
      )

      var { error } = reviewResponse
      if (error) {
        res.status(400).json({ error })
        return
      }

      if (reviewResponse.modifiedCount === 0) {
        throw new Error("unable to update review")
      }

      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  // 5. Review ለማጥፋት (DELETE)
  static async apiDeleteReview(req, res, next) {
    try {
      const reviewId = req.params.id
      const reviewResponse = await ReviewsDAO.deleteReview(reviewId)
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }
}