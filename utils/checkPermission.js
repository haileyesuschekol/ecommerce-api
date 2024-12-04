const CustomeError = require("../errors")

const checkpermission = (requestUser, resourceUserId) => {
  if (requestUser.role === "admin") return
  if (requestUser.userId === resourceUserId.toString()) return
  throw new CustomeError.unAuthorized("Unauthorized access!")
}

module.exports = checkpermission
