const express = require("express")
const router = express.Router()
const { authenticate } = require("../middleware/authentication")

const {
  createReview,
  getAllReview,
  getSingleReview,
  updateReview,
  deleteReview,
} = require("../controller/reviewController")

router.route("/").get(getAllReview).post(authenticate, createReview)

router
  .route("/:id")
  .get(getSingleReview)
  .patch(authenticate, updateReview)
  .delete(authenticate, deleteReview)

module.exports = router
