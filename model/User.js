const mongoose = require("mongoose")
const validator = require("validator")
//define user model
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name!"],
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "Please provid email!"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide valid email!",
    },
  },
  passsword: {
    type: String,
    require: [true, "Please provide a password!"],
    minlength: 3,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
})

module.exports = mongoose.model("User", userSchema)
