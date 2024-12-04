const { StatusCodes } = require("http-status-codes")
const User = require("../model/User")
const CustomeError = require("../errors")
const { createTokenUser, attachCookieToResponse } = require("../utils")

//get all user
const getAllUser = async (req, res) => {
  const user = await User.find({ role: "user" }).select("-password")
  res.status(StatusCodes.OK).json({ user })
}

//get single user
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

//update user
const updateUser = async (req, res) => {
  const { name, email } = req.body
  if (!name || !email) {
    throw new CustomeError.BadRequestError("please provide name and email!")
  }
  const user = await User.findByIdAndUpdate(
    { _id: req.user.userId },
    { name, email },
    { new: true, runValidators: true }
  )
  const tokenUser = createTokenUser(user)
  attachCookieToResponse({ res, user: tokenUser })
  res.status(StatusCodes.OK).json({ user: tokenUser })
}

//update password
const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body
  if (!oldPassword || !newPassword) {
    throw new CustomeError.BadRequestError(
      "please provide old and new password!"
    )
  }
  const user = await User.findOne({ _id: req.user.userId })
  const isOldPasswordCorrect = await user.comparePassword(oldPassword)
  if (!isOldPasswordCorrect) {
    throw new CustomeError.UnauthenticatedError("Incorrect old Password!")
  }
  user.password = newPassword
  await user.save()
  res.status(StatusCodes.OK).json({ msg: "Password updated successfully!" })
}

module.exports = {
  getAllUser,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
}
