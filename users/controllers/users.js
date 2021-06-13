const { validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");

var { models } = require("../models/index");
var User = models.User;

function generateAccessToken(username) {
  return jwt.sign({ name: username }, process.env.TOKEN_SECRET, {
    expiresIn: "10h",
  });
}

/*
Creates a token with an expiration time of 10hrs.
No refresh token provided for simplicity.
The user has to login again once the token expires.
*/

async function createToken(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { username, password } = req.body;
  const isValid = await User.exists({ username, password });
  if (!isValid) {
    return res.status(401).json("Invalid credentials");
  }
  const accessToken = generateAccessToken(username);
  return res.status(201).json({ accessToken });
}

module.exports = { createToken };
