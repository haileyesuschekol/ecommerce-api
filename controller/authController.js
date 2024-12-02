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
  res.send("Login user")
}

const logout = async (req, res) => {
  res.send("Logout user")
}

module.exports = { register, login, logout }
