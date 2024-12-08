const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      require: [true, "please provide rating!"],
    },
    title: {
      type: String,
      trim: true,
      required: [true, "Please provide title!"],
      maxlength: 100,
    },
    comment: {
      type: String,
      required: [true, "please provide comment!"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
)

// calculate average rating and number of rating
///create aggregation pipeline
reviewSchema.statics.calculateAverageRating = async function (productId) {
  const result = await this.aggregate([
    //match and group
    { $match: { product: productId } },
    {
      $group: {
        _id: null,
        averageRating: { $avg: "$rating" },
        numOfReviews: { $sum: 1 },
      },
    },
  ])

  //set averagerating and number of rating
  try {
    await this.model("Product").findOneAndUpdate(
      { _id: productId },
      {
        averageRating: result[0]?.averageRating || 0,
        numOfReviews: result[0]?.numOfReviews || 0,
      }
    )
  } catch (error) {
    console.log(error)
  }
}

//calculate when save method is trigger
reviewSchema.post("save", async function () {
  await this.constructor.calculateAverageRating(this.product)
})

//calculate when delete is trigger
reviewSchema.post("findByIdAndDelete", async function () {
  await this.constructor.calculateAverageRating(this.product)
})

//user only give one review per product
reviewSchema.index({ product: 1, user: 1 }, { unique: true })

module.exports = mongoose.model("Review", reviewSchema)
