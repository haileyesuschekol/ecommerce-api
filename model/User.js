const mongoose = require("mongoose")
const validator = require("validator")
const bycrypt = require("bcryptjs")

//define user model
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name!"],
    minlength: 2,
    maxlength: 50,
  },
  email: {
    unique: true,
    type: String,
    required: [true, "Please provid email!"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide valid email!",
    },
  },
  password: {
    type: String,
    required: [true, "Please provide a password!"],
    minlength: 3,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
})

//hash password
userSchema.pre("save", async function () {
  const salt = await bycrypt.genSalt(10)
  this.password = await bycrypt.hash(this.password, salt)
})

//compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bycrypt.compare(candidatePassword, this.password)
  return isMatch
}

module.exports = mongoose.model("User", userSchema)
