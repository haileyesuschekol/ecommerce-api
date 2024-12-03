const { StatusCodes } = require("http-status-codes")
const User = require("../model/User")
const CustomeError = require("../errors")
const { attachCookieToResponse } = require("../utils")

const register = async (req, res) => {
  const { name, email, password } = req.body

  //check email if exists
  const isEmail = await User.findOne({ email })
  if (isEmail) {
    throw new CustomeError.BadRequestError("Email already exists!")
  }
  //check if it is first rigister in Database
  //first rigester role is admin otherwise it is not
  const isFirstAccount = (await User.countDocuments({})) === 0
  const role = isFirstAccount ? "admin" : "user"
  const user = await User.create({ name, email, password, role })
  const userToken = { userId: user._id, userName: user.name, role: user.role }
  //create cookie
  attachCookieToResponse({ res, user: userToken })
  res.status(StatusCodes.CREATED).json({ user: userToken })
}

const login = async (req, res) => {
  const { email, password } = req.body
  if (!email && !password) {
    throw new CustomeError.BadRequestError("please provid email and password!")
  }
  const user = await User.findOne({ email })
  if (!user) {
    throw new CustomeError.UnauthenticatedError("invalid credentials!")
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new CustomeError.UnauthenticatedError("incorrect password!")
  }

  const userToken = { userId: user._id, userName: user.name, role: user.role }
  //create cookie
  attachCookieToResponse({ res, user: userToken })
  res.status(StatusCodes.CREATED).json({ user: userToken })
}

const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  })
  res.status(StatusCodes.OK).send("Logout user")
}

module.exports = { register, login, logout }
