const express = require("express")
const router = express.Router()
const {
  authenticate,
  authorizedPermission,
} = require("../middleware/authentication")

const {
  createOrder,
  getAllOrder,
  getSingleOrder,
  getCurrentUserOrder,
  updateOrder,
} = require("../controller/orderController")

router.route('/')
.post(authenticate, createOrder)
.get(authenticate, authorizedPermission('admin'), getAllOrder)

router.route('/showAllMyOrder')
.get(authenticate, getCurrentUserOrder)

router.route('/id')
.get(authenticate, getSingleOrder)
.patch(authenticate , updateOrder)


module.exports = router