const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    adviser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    image: {
      type: String
    },
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: String,
      required: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
);

module.exports = Product = mongoose.model("Product", productSchema);
