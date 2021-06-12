var express = require("express");
var router = express.Router();
const { body, query } = require("express-validator");

var { createSale, getSalesCount } = require("../controllers/sales");

/* CREATE sale */
router.post(
  "/sales",
  body("color").notEmpty(),
  body("model").notEmpty(),
  body("year").isNumeric(),
  body("quantity").isNumeric(),
  createSale
);

/* 
GET sales count listing.
date in format YYYY/MM/DD
 */
router.get(
  "/sales/count",
  query("year").optional().isNumeric(),
  query("soldOn").optional().isDate(),
  getSalesCount
);

module.exports = router;
