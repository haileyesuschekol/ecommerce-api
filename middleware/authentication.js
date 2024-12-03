const { isTokenValid } = require("../utils")
const CustomeError = require("../errors")
const authenticate = async (req, res, next) => {
  const token = req.signedCookies.token
  if (!token) {
    throw new CustomeError.UnauthenticatedError("Authentication failed!")
  } else {
    try {
      const { userName, userId, role } = isTokenValid({ token })
      req.user = { userName, userId, role }
      next()
    } catch (error) {
      throw new CustomeError.UnauthenticatedError("Authentication failed!!")
    }
  }
}

module.exports = authenticate
