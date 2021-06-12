var { User } = require("../models/index");
var jwt = require("jsonwebtoken");

function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: "1800s" });
}

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
