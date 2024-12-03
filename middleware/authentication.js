const { isTokenValid } = require("../utils")
const CustomeError = require("../errors")

//authenticate route
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

//authorize route
const authorizedPermission = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomeError.unAuthorized("Authorization failed!")
    }
    next()
  }
}

module.exports = { authenticate, authorizedPermission }
