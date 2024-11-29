require("dotenv").config()
require("express-async-errors")

//express
const express = require("express")
const app = express()

//rest middlewares
const morgan = require("morgan")

//import Db connection
const connectDb = require("./db/connect")

//error handler middlewares
const errorHandlerMiddleware = require("./middleware/error-handler")
const notFoundMiddleware = require("./middleware/not-found")

app.use(morgan("tiny"))
app.use(express.json())

app.get("/", (req, res) => {
  res.send("E-COMMERCE API")
})

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

//define port
const port = process.env.Port || 8080
const start = () => {
  connectDb()
  app.listen(port, console.log(`server listen to port ${port} ...`))
}

//start server and Database
start()
