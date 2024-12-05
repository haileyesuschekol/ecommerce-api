const { required } = require("joi")
const mongoose = require("mongoose")

const reviewModel = new mongoose.Schema(
  {
    rating: {
      type: String,
      min: 1,
      max: 5,
      require: [true, "please provide rating!"],
    },
    title: {
      type: String,
      trim: trim,
      required: [true, "Please provide title!"],
      maxlength: 100,
    },
    comment: {
      type: String,
      required: [true, "please provide comment!"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
)

reviewModel.index({ product: 1, user: 1 }, { unique: true })

module.exports = mongoose.model("Review", reviewModel)
