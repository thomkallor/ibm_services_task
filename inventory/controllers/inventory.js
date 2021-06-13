var { models } = require("../models/index");
var Inventory = models.Inventory;
const { validationResult } = require("express-validator");

/* Create or update an inventory if validations are right */
const updateInventory = async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { color, model, year } = req.body;
  const query = { color, model, year };
  const inventory = await Inventory.findOneAndUpdate(query, req.body, {
    new: true,
    upsert: true,
  });

  return res.status(200).json(inventory);
};

/* 
Update the inventory on sale event.
The inventory and sales has been considered completely different.
Users are allowed to place an order on anything no validations carried out.
The inventory will be updated if the item is present (dispatch order).
If not found an order can be placed.
*/
const updateInventoryOnSale = async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { color, model, year, quantity } = req.body;
  const query = { color, model, year };
  let inventory = await Inventory.findOne(query);

  // return 404 if car is unavailable
  if (!inventory) {
    return res.status(404).json("Car not found.");
  }

  const updatedQuantity = inventory.quantity - quantity;

  // return 403 if car is unavailable
  if (updatedQuantity < 0) {
    return res.status(403).json("Car unavailable");
  }

  inventory.quantity = updatedQuantity;
  inventory = await inventory.save();
  return res.status(200).json(inventory);
};

// Get items in an inventory
const getInventory = async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let query = {};
  const { id, color, model, year } = req.query;
  if (id) {
    query._id = id;
  }
  if (color) {
    query.color = color;
  }
  if (model) {
    query.model = model;
  }
  if (year) {
    query.year = year;
  }

  const inventory = await Inventory.find(query);
  return res.status(200).json(inventory);
};

module.exports = {
  updateInventory,
  updateInventoryOnSale,
  getInventory,
};
