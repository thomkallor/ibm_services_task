var express = require("express");
var router = express.Router();
const { body, query } = require("express-validator");

var { createSale, getSalesCount } = require("../controllers/sales");

/* CREATE sale */
router.post(
  "/",
  body("color").notEmpty().toLowerCase(),
  body("model").notEmpty().toLowerCase(),
  body("year").isNumeric(),
  body("quantity").isNumeric(),
  createSale
);

/* 
GET sales count listing.
date in format YYYY/MM/DD in URL ascii coded / -> 2F (2021%2F06%2F11)
 */
router.get(
  "/count",
  query("color").optional().toLowerCase(),
  query("model").optional().toLowerCase(),
  query("year").optional().isNumeric(),
  query("soldAt").optional().isDate(),
  getSalesCount
);

module.exports = router;
