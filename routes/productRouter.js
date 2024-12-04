const express = require("express")
const router = express.Router()
const {
  authenticate,
  authorizedPermission,
} = require("../middleware/authentication")

const {
  createProduct,
  deleteProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
  uploadImage,
} = require("../controller/productController")

router
  .route("/")
  .post([authenticate, authorizedPermission("admin")], createProduct)
  .get(getAllProduct)

router
  .route("/uploadImage")
  .post([authenticate, authorizedPermission("admin")], uploadImage)

router
  .route("/:id")
  .get(getSingleProduct)
  .patch([authenticate, authorizedPermission("admin")], updateProduct)
  .delete(deleteProduct)

module.exports = router
