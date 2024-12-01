const { StatusCodes } = require("http-status-codes")
const User = require("../model/User")
const CustomeError = require("../errors")

const register = async (req, res) => {
  const { email, name, password } = req.body

  //check email if exists
  const isEmail = await User.findOne({ email })
  if (isEmail) {
    throw new CustomeError.BadRequestError("Email already exists!")
  }
  //check if it is first rigister in Database
  //first rigester role is admin otherwise it is not
  const isFirst = (await User.countDocuments({})) === 0
  const role = isFirst ? "admin" : "user"

  const user = await User.create(email, name, password, role)
  res.status(StatusCodes.CREATED).json({ user })
}

const login = async (req, res) => {
  res.send("Login user")
}

const logout = async (req, res) => {
  res.send("Logout user")
}

module.exports = { register, login, logout }
