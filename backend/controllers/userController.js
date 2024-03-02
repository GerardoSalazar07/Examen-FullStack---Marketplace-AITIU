const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const User = require("../models/userModel");

const { v4: uuidv4 } = require("uuid");

const { cloudinary } = require("../cloudinary");

dotenv.config();

module.exports.getLoginData = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      res.json({
        username: user.username,
        userType: user.userType,
        profileImage: user.profileImage,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    // Handle other potential errors, e.g., database errors
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports.logout = (req, res) => {
  try {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.localPassport = (req, res) => {
  const user = req.user;
  res.json({
    id: user._id,
    username: user.username,
    userType: user.userType,
    profileImage: user.profileImage,
  });
};
