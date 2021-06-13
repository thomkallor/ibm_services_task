var express = require("express");
var router = express.Router();
const { body } = require("express-validator");

var { createToken } = require("../controllers/users");

/* POST user auth */
router.post(
  "/auth",
  body("username").notEmpty(),
  body("password").notEmpty(),
  createToken
);

module.exports = router;
