const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
      default: "",
    },
    name: {
      type: String,
    },
    lastName: {
      type: String,
    },
    username: {
      type: String,
      lowercase: true,
      unique: true,
    },
    dwp: {
      type: Boolean,
    },
    userType: {
      type: String,
      enum: ["Adviser", "Admin"],
      default: "Adviser",
    },
    profileImage: {
      url: String,
      filename: String,
    },
    tradename: {
      type: String,
    },
    rfc: {
      type: String,
    },
    fiscalAddress: {
      address: { type: String },
      district: { type: String },
      postalCode: { type: String },
      city: { type: String },
      state: { type: String },
      country: { type: String },
    },

    payment: {
      cuenta: {
        type: String,
      },
      banco: {
        type: String,
        default: "",
      },
      comision: {
        type: String,
      },
      salario: {
        type: String,
      },
    },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],

    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(passportLocalMongoose, { usernameQueryFields: ["email"] });

module.exports = User = mongoose.model("User", userSchema);
