const mongoose = require("mongoose");
const config = require("./../../../helper/config");

const tokenSchema = new mongoose.Schema({
  token: { type: String },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 5184000
  },
});

module.exports = mongoose.model("token", tokenSchema, config.db.prefix + "token");