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

const { getSingleProductReview } = require("../controller/reviewController")
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
  .delete([authenticate, authorizedPermission("admin")], deleteProduct)

router.route("/:id/reviews").get(getSingleProductReview)

module.exports = router
