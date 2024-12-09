const Product = require("../model/Product")
const Order = require("../model/Order")
const { StatusCodes } = require("http-status-codes")
const CustomeError = require("../errors")
const { checkPermission, fakeStripeAPI } = require("../utils")

const createOrder = async (req, res) => {
  const { items: cartItems, tax, shippingFee } = req.body

  if (!cartItems || cartItems.length < 1) {
    throw new CustomeError.BadRequestError("No cart itme provided!")
  }

  if (!tax || shippingFee < 0) {
    throw new CustomeError.BadRequestError(
      "please provide tax and shipping fee!"
    )
  }

  let orderItems = []
  let subTotal = 0

  for (const item of cartItems) {
    const dbProduct = await Product.findOne({ _id: item.product })
    if (!dbProduct) {
      throw new CustomeError.NotFoundError("No product found!")
    }

    const { name, price, image, _id } = dbProduct
    const singleOrderItem = {
      amount: item.amount,
      name,
      price,
      image,
      product: _id,
    }

    //add item to cart
    orderItems = [...orderItems, singleOrderItem]
    //calculate subtotal
    subTotal += item.amount * price
  }
  //calculate total
  const total = tax + shippingFee + subTotal

  //get client secret
  const paymentIntent = await fakeStripeAPI({
    amount: total,
    currency: "usd",
  })

  const order = await Order.create({
    orderItems,
    total,
    subTotal,
    tax,
    shippingFee,
    clientSecret: paymentIntent.client_secret,
    user: req.user.userId,
  })
  res
    .status(StatusCodes.CREATED)
    .json({ order, clientSecret: order.clientSecret })
}

//get all order
const getAllOrder = async (req, res) => {
  const order = await Order.find({})
  res.status(StatusCodes.OK).json({ order, count: order.length })
}

//get single order
const getSingleOrder = async (req, res) => {
  const { id: orderId } = req.params
  const order = await Order.findOne({ _id: orderId })
  if (!order) {
    throw new CustomeError.NotFoundError("Order not found!")
  }
  checkPermission(req.user, order.user)
  res.status(StatusCodes.OK).json({ order })
}

//get current order
const getCurrentUserOrder = async (req, res) => {
  const order = await Order.find({ user: req.user.userId })
  res.status(StatusCodes.OK).json({ order, count: order.length })
}

const updateOrder = async (req, res) => {
  const { id: orderId } = req.params
  const { paymentIntentId } = req.body
  const order = await Order.findOne({ _id: orderId })
  if (!order) {
    throw new CustomeError.NotFoundError("Order not found!")
  }
  checkPermission(req.user, order.user)

  order.paymentIntentId = paymentIntentId
  order.status = "paid"
  await order.save()
  res.status(StatusCodes.OK).json({ order })
}

module.exports = {
  createOrder,
  getAllOrder,
  getSingleOrder,
  getCurrentUserOrder,
  updateOrder,
}
