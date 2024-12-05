const Product = require("../model/Product")
const Review = require("../model/Review")
const { StatusCodes } = require("http-status-codes")
const CustomeError = require("../errors")
const { checkPermission } = require("../utils")

//create review
const createReview = async (req, res) => {
  //check if product exist
  const { product: productId } = req.body
  console.log(req.body)
  const isValidProduct = await Product.findOne({ _id: productId })
  if (!isValidProduct) {
    throw new CustomeError.NotFoundError("Product not found1!")
  }

  //check if already submited
  const alreadySubmmited = await Review.findOne({
    product: productId,
    user: req.user.userId,
  })
  if (alreadySubmmited) {
    throw new CustomeError.BadRequestError("Already reviewed!")
  }
  //create
  req.body.user = req.user.userId
  const review = await Review.create(req.body)
  res.status(StatusCodes.CREATED).json({ review })
}

//get all review
const getAllReview = async (req, res) => {
  const review = await Review.find({})
  res.status(StatusCodes.OK).json({ review, count: review.length })
}

//get single review
const getSingleReview = async (req, res) => {
  const { id: reviewId } = req.params
  const review = await Review.findOne({ _id: reviewId })
  if (!review) {
    throw new CustomeError.NotFoundError("No review found!")
  }
  res.status(StatusCodes.OK).json({ review })
}

//update review
const updateReview = async (req, res) => {
  const { id: reviewId } = req.params
  const { title, rating, description } = req.body
  const review = await Review.findOne({ _id: reviewId })
  if (!review) {
    throw new CustomeError.NotFoundError("No review found!")
  }

  //check permission
  checkPermission(req.user, review.user)

  //update
  review.title = title
  review.rating = rating
  review.description = description

  //save
  await review.save()
  res.status(StatusCodes.OK).json({ review })
}

//delete review
const deleteReview = async (req, res) => {
  const { id: reviewId } = req.params
  const review = await Review.findOne({ _id: reviewId })
  if (!review) {
    throw new CustomeError.NotFoundError("No review found!")
  }
  checkPermission(req.user, review.user)
  await review.deleteOne()
  res.status(StatusCodes.OK).json({ msg: "delete review" })
}

module.exports = {
  createReview,
  getAllReview,
  getSingleReview,
  updateReview,
  deleteReview,
}
