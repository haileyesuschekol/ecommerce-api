const jwt = require("jsonwebtoken")

//jwt
const createJwt = ({ payload }) =>
  jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  })

const attachCookieToResponse = ({ res, user }) => {
  const token = createJwt({ payload: user })
  //send cookie to response
  const expDate = 1000 * 60 * 60 * 24
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + expDate),
    secure: process.env.NODE_ENV === "production",
    signed: true,
  })
}
//validate jwt
const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET)

module.exports = { createJwt, isTokenValid, attachCookieToResponse }
