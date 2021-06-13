var express = require("express");
var router = express.Router();
const { body } = require("express-validator");

var { authenticateToken } = require("../middleware/authentication");

var {
  updateInventory,
  updateInventoryOnSale,
  getInventory,
} = require("../controllers/inventory");

/* 
UPDATE Inventory on sale 
Skipping authentication for the endpoint.
Will be used internally to update the inventory.
Not to be exposed to client.
*/
router.put(
  "/sale",
  body("color").notEmpty(),
  body("model").notEmpty(),
  body("year").isNumeric(),
  body("quantity").isNumeric(),
  updateInventoryOnSale
);

/* GET Inventory listing. */
router.get(
  "/",
  body("year").optional().isNumeric(),
  authenticateToken,
  getInventory
);

/* UPDATE Inventory listing. */
router.put(
  "/",
  body("color").notEmpty(),
  body("model").notEmpty(),
  body("year").isNumeric(),
  body("quantity").isNumeric(),
  authenticateToken,
  updateInventory
);

module.exports = router;
