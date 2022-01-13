const mongoose = require("mongoose");
const config = require("./../../../helper/config");
const uniqueValidator = require("mongoose-unique-validator");

var userSchema = mongoose.Schema({
  walletAddress: {
    type: String,
    maxlength: [64, "Wallet address can't exceed 64 characters"],
    default: "",
    unique: true,
    required: true,
  },
  firstname: {
    type: String,
    maxlength: [32, "Firstname can't exceed 32 characters"],
    default: "",
  },
  email: {
    type: String,
    maxlength: [32, "Email can't exceed 32 characters"],
    default: "",
  },
  lastname: {
    type: String,
    maxlength: [32, "Lastname can't exceed 32 characters"],
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model(
  "users",
  userSchema,
  config.db.prefix + "users"
);
