const { StatusCodes } = require("http-status-codes")
const User = require("../model/User")
const CustomeError = require("../errors")

const getAllUser = async (req, res) => {
  const user = await User.find({ role: "user" }).select("-password")
  res.status(StatusCodes.OK).json({ user })
}
const getSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select("-password")
  if (!user) {
    throw new CustomeError.NotFoundError("User not found!")
  }
  res.status(StatusCodes.OK).json({ user })
}
const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user })
}
const updateUser = async (req, res) => {
  res.send("update user")
}
const updateUserPassword = async (req, res) => {
  res.send("update password")
}

module.exports = {
  getAllUser,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
}
