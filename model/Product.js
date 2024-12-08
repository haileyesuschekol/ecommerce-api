const mongoose = require("mongoose")
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "please provide product name!"],
      maxlength: [100, "Name can not be more than 100 character!"],
    },
    price: {
      type: Number,
      required: [true, "Please provide a price!"],
      default: 0,
    },
    description: {
      type: String,
      required: [true, "Please provide a description!"],
    },
    image: {
      type: String,
      default: "/upload/example.jpeg",
    },
    catagory: {
      type: String,
      required: [true, "Please provide product catagory!"],
      enum: ["office", "kitchen", "bedroom"],
    },
    company: {
      type: String,
      required: [true, "Please provide a company!"],
      enum: {
        values: ["ikea", "liddy", "markos"],
        message: "{VALUE} is not supported",
      },
    },
    colors: {
      type: [String],
      default: ["#222"],
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    freeShipping: {
      type: Boolean,
      default: false,
    },
    inventory: {
      type: Number,
      required: true,
      default: 15,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },

  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
)

// trigger to get single product
productSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "product",
  justOne: false,
})

//delete reviews when associated product deleted
productSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function () {
    // 'this' refers to the document being deleted
    await this.model("Review").deleteMany({ product: this._id })
  }
)
module.exports = mongoose.model("Product", productSchema)
