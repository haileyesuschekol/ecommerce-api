const { StatusCodes } = require("http-status-codes")
const User = require("../model/User")
const CustomeError = require("../errors")

const register = async (req, res) => {
  const { email } = req.body

  //check email if exists
  const isEmail = await User.find({ email })
  if (isEmail) {
    throw new CustomeError.BadRequestError("Email already exists!")
  }

  const user = await User.create(req.body)
  res.status(StatusCodes.CREATED).json({ user })
}

const login = async (req, res) => {
  res.send("Login user")
}

const logout = async (req, res) => {
  res.send("Logout user")
}

module.exports = { register, login, logout }
