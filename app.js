require("dotenv").config()
require("express-async-errors")

//express
const express = require("express")
const app = express()

//rest middlewares
const morgan = require("morgan")
const cookieParser = require("cookie-parser")
const fileUpload = require("express-fileupload")
//routes
const authRoute = require("./routes/authRouter")
const userRoute = require("./routes/userRouter")
const productRoute = require("./routes/productRouter")
const reviewRoute = require("./routes/reviewRouter")
const orderRoute = require("./routes/orderRouter")
//import Db connection
const connectDb = require("./db/connect")

//error handler middlewares
const errorHandlerMiddleware = require("./middleware/error-handler")
const notFoundMiddleware = require("./middleware/not-found")

app.use(morgan("tiny"))
app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))
app.use(express.static("./public"))
app.use(fileUpload())

app.get("/", (req, res) => {
  res.send("E-COMMERCE API")
})

//auth-route
app.use("/api/v1/auth", authRoute)
app.use("/api/v1/users", userRoute)
app.use("/api/v1/products", productRoute)
app.use("/api/v1/reviews", reviewRoute)
app.use("/api/v1/orders", orderRoute)

//error-handlers
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
