const createProduct = async (req, res) => {
  res.send("create Product")
}
const getAllProduct = async (req, res) => {
  res.send("get All product")
}
const getSingleProduct = async (req, res) => {
  res.send("get single product")
}
const deleteProduct = async (req, res) => {
  res.send("delete product")
}
const updateProduct = async (req, res) => {
  res.send("update product")
}
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
