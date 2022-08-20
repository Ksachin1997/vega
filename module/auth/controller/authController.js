const User = require("../models/adminModel");
const Token = require("../models/tokenModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, ACCESS_TOKEN_EXPIRY } = process.env;

exports.signup = async (req, res) => {
  try {
    let user = await User.findOne({ username: req.body.username });
    if (user) {
      return res.status(400).json({ error: "Username taken." });
    } else {

      user = await new User(req.body).save();
      let accessToken = await user.createAccessToken();
      let refreshToken = await user.createRefreshToken();

      return res.status(201).json({ accessToken, refreshToken });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
};
exports.login = async (req, res) => {
  try {
    //check if user exists in database:
    let user = await User.findOne({ username: req.body.username });
    //send error if no user found:
    if (!user) {
      return res.status(404).json({ error: "No user found!" });
    } else {
      //check if password is valid:
      let valid = await bcrypt.compare(req.body.password, user.password);
      if (valid) {
        //generate a pair of tokens if valid and send
        let accessToken = await user.createAccessToken();
        let refreshToken = await user.createRefreshToken();

        return res.status(201).json({ accessToken, refreshToken });
      } else {
        //send error if password is invalid
        return res.status(401).json({ error: "Invalid password!" });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
};
exports.generateRefreshToken = async (req, res) => {
  try {
    //get refreshToken
    const { refreshToken } = req.body;
    //send error if no refreshToken is sent
    if (!refreshToken) {
      return res.status(403).json({ error: "Access denied,token missing!" });
    } else {
      //query for the token to check if it is valid:
      const tokenDoc = await Token.findOne({ token: refreshToken });
      //send error if no token found:
      if (!tokenDoc) {
        return res.status(401).json({ error: "Token expired!" });
      } else {
        //extract payload from refresh token and generate a new access token and send it
        const payload = jwt.verify(tokenDoc.token, REFRESH_TOKEN_SECRET);
        const accessToken = jwt.sign({ user: payload }, ACCESS_TOKEN_SECRET, {
          expiresIn: ACCESS_TOKEN_EXPIRY,
        });
        return res.status(200).json({ accessToken });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
};
exports.logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    await Token.findOneAndDelete({ token: refreshToken });
    return res.status(200).json({ success: "User logged out!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
};