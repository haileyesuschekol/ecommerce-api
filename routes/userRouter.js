const express = require("express")
const router = express.Router()
const authenticate = require("../middleware/authentication")
const {
  getAllUser,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require("../controller/userController")

router.route("/").get(authenticate, getAllUser)

router.route("/user").get(showCurrentUser)
router.route("/updateUser").patch(updateUser)
router.route("/updateUserPassword").patch(updateUserPassword)

router.route("/:id").get(authenticate, getSingleUser)

module.exports = router
