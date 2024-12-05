const Product = require("../model/Product")
const Review = require("../model/Review")
const { StatusCodes } = require("http-status-codes")
const CustomeError = require("../errors")

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
const getAllReview = async (req, res) => {
  res.send("get all review")
}
const getSingleReview = async (req, res) => {
  res.send("get single review")
}
const updateReview = async (req, res) => {
  res.send("update review")
}
const deleteReview = async (req, res) => {
  res.send("delete review")
}

module.exports = {
  createReview,
  getAllReview,
  getSingleReview,
  updateReview,
  deleteReview,
}
