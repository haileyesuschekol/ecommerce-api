const CustomAPIError = require("./custom-api")
const UnauthenticatedError = require("./unauthenticated")
const NotFoundError = require("./not-found")
const BadRequestError = require("./bad-request")
const unAuthorized = require("./unathorized")
module.exports = {
  CustomAPIError,
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
  unAuthorized,
}
