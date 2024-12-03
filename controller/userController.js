const getAllUser = async (req, res) => {
  res.send("Get all user")
}
const getSingleUser = async (req, res) => {
  res.send("Get single user")
}
const showCurrentUser = async (req, res) => {
  res.send("current user")
}
const updateUser = async (req, res) => {
  res.send("update user")
}
const updateUserPassword = async (req, res) => {
  res.send("update password")
}

module.exports = {
  getAllUser,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
}
