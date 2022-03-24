const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Token = require("./tokenModel");
const config = require("./../../../helper/config");
const uniqueValidator = require("mongoose-unique-validator");
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY } = process.env;

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

adminSchema.methods = {
  createAccessToken: async function () {
    try {
      let { _id, username } = this;
      let accessToken = jwt.sign(
        { user: { _id, username } },
        ACCESS_TOKEN_SECRET,
        {
          expiresIn: ACCESS_TOKEN_EXPIRY,
        }
      );
      return accessToken;
    } catch (error) {
      console.error(error);
      return;
    }
  },
  createRefreshToken: async function () {
    try {
      let { _id, username } = this;
      let refreshToken = jwt.sign(
        { user: { _id, username } },
        REFRESH_TOKEN_SECRET,
        {
          expiresIn: REFRESH_TOKEN_EXPIRY,
        }
      );

      await new Token({ token: refreshToken }).save();
    
      return refreshToken;
    } catch (error) {
      console.error(error);
      return;
    }
  },
};

adminSchema.pre("save", async function (next) {
  try {
    let salt = await bcrypt.genSalt(12);
    let hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
  } catch (error) {
    console.error(error);
  }
  return next();
});

adminSchema.plugin(uniqueValidator);

module.exports = mongoose.model("admin", adminSchema, config.db.prefix + "admin");