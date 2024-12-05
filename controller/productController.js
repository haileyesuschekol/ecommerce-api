const Product = require("../model/Product")
const { StatusCodes } = require("http-status-codes")
const CustomeError = require("../errors")

//create product
const createProduct = async (req, res) => {
  req.body.user = req.user.userId
  const product = await Product.create(req.body)
  res.status(StatusCodes.CREATED).json({ product })
}

//get all product
const getAllProduct = async (req, res) => {
  const product = await Product.find({})
  res.status(StatusCodes.OK).json({ product, count: product.length })
}

//get single product
const getSingleProduct = async (req, res) => {
  const { id: productId } = req.params
  const product = await Product.findOne({ _id: productId })
  if (!product) {
    throw new CustomeError.NotFoundError("No product found!")
  }
  res.status(StatusCodes.OK).json({ product })
}

//update product
const updateProduct = async (req, res) => {
  const { id: productId } = req.params
  const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
    new: true,
    runValidators: true,
  })
  if (!product) {
    throw new CustomeError.NotFoundError("No product found!")
  }
  res.status(StatusCodes.OK).json({ product })
}

//delete product
const deleteProduct = async (req, res) => {
  const { id: productId } = req.params
  const product = await Product.findOneAndDelete({ _id: productId })
  if (!product) {
    throw new CustomeError.NotFoundError("No product found!")
  }
  res.status(StatusCodes.OK).json({ msg: "product deleted successfully!" })
}

//upload image
const uploadImage = async (req, res) => {
  res.send("upload image")
}

module.exports = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  deleteProduct,
  updateProduct,
  uploadImage,
}
