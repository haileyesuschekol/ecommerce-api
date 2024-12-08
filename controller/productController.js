const Product = require("../model/Product")
const { StatusCodes } = require("http-status-codes")
const CustomeError = require("../errors")
const path = require("path")

//create product
const createProduct = async (req, res) => {
  req.body.user = req.user.userId
  const product = await Product.create(req.body)
  res.status(StatusCodes.CREATED).json({ product })
}

//get all product
const getAllProduct = async (req, res) => {
  const product = await Product.find({}).populate("reviews")
  res.status(StatusCodes.OK).json({ product, count: product.length })
}

//get single product with reviews - mongoose virtuals
const getSingleProduct = async (req, res) => {
  const { id: productId } = req.params
  const product = await Product.findOne({ _id: productId }).populate("reviews")
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
  const product = await Product.findOne({ _id: productId })
  if (!product) {
    throw new CustomeError.NotFoundError("No product found!")
  }

  await product.deleteOne()
  res.status(StatusCodes.OK).json({ msg: "product deleted successfully!" })
}

//upload image
const uploadImage = async (req, res) => {
  const productImage = req.files.image
  if (!productImage) {
    throw new CustomeError.BadRequestError("Please upload image!")
  }

  //check the file is image
  if (!productImage.mimetype.startsWith("image")) {
    throw new CustomeError.BadRequestError(
      "File not supported, please upload image only!"
    )
  }

  //check file length
  const maxSize = 1024 * 1024
  if (productImage.size > maxSize) {
    throw new CustomeError.BadRequestError("Please upload less than 1mb!")
  }

  //move file
  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${productImage.name}`
  )
  await productImage.mv(imagePath)
  res.status(StatusCodes.OK).json({ image: `/uploads/${productImage.name}` })
}

module.exports = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  deleteProduct,
  updateProduct,
  uploadImage,
}
