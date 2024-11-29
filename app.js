require("dotenv").config()
const express = require("express")
const app = express()

//import Db connection
const connectDb = require("./db/connect")

//define port
const port = process.env.Port || 8080
const start = () => {
  connectDb()
  app.listen(port, console.log(`server listen to port ${port} ...`))
}

//start server and Database
start()
