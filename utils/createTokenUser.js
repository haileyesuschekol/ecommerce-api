const createTokenUser = (user) => {
  return { userId: user._id, userName: user.name, role: user.role }
}

module.exports = { createTokenUser }
