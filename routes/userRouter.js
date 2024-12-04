const express = require("express")
const router = express.Router()
const {
  authenticate,
  authorizedPermission,
} = require("../middleware/authentication")
const {
  getAllUser,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require("../controller/userController")

router.route("/").get(authenticate, authorizedPermission("admin"), getAllUser)

router.route("/user").get(authenticate, showCurrentUser)
router.route("/updateUser").patch(authenticate, updateUser)
router.route("/updateUserPassword").patch(authenticate, updateUserPassword)

router.route("/:id").get(authenticate, getSingleUser)

module.exports = router
