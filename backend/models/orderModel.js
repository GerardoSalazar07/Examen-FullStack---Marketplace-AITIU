const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    shippingCompany: {
      type: String
    },
    trackingNumber: {
      type: String
    },
    status: {
      type: String,
      enum: ["Pending", "In process", "Sent", "Delivered"],
      default: "Pending",
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Order = mongoose.model("Order", orderSchema);
