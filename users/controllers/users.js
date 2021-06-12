var { User } = require("../models/index");
var jwt = require("jsonwebtoken");

function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: "3600s" });
}

/*
Creates a token with an expiration time of 1hr.
No refresh token provided for simplicity.
The user has to login again once the token expires.
*/

async function createToken(req, res) {
  const { username, password } = req.body;
  const isValid = await User.exists({ username, password });
  if (!isValid) {
    return res.status(401).json("Invalid credentials");
  }
  const accessToken = generateAccessToken(user);
  res.status(201).json({ accessToken });
}

module.exports = { createToken };
