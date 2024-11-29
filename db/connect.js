require("dotenv").config()
const mongoose = require("mongoose")

//Database connection
const connectDB = () => {
  return mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("successfully connected to Db"))
}

module.exports = connectDB
