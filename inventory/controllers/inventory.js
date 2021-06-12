var models = require("../models/index");
var Inventory = models.Inventory;
const { validationResult } = require("express-validator");

/* Create a inventory if validations are right */
const updateInventory = async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { color, model, year } = req.body;
  const query = { color, model, year };
  const inventory = await Inventory.updateMany(query, req.body, {
    upsert: true,
  });

  return res.status(200).json(inventory);
};

/* Create a inventory if validations are right */
const updateInventoryOnSale = async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { color, model, year, quantity } = req.body;
  const query = { color, model, year };
  const inventory = await Inventory.findOne(query);
  const updatedQuantity = inventory.quantity - quantity;

  // return 403 if car is unavailable
  if (updatedQuantity < 0) {
    return res.status(403).json("Car unavailable");
  }

  inventory.quantity = updatedQuantity;
  inventory = await inventory.save();
  return res.status(200).json(inventory);
};

const getInventory = async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let query = {};
  const { color, model, year } = req.query;
  if (color) {
    query.color = color;
  }
  if (model) {
    query.model = model;
  }
  if (year) {
    query.year = year;
  }
  if (soldOn) {
    query.soldOn = new Date(soldOn);
  }

  const inventory = await Inventory.find(query);
  res.status(200).json(inventory);
};

module.exports = {
  updateInventory,
  updateInventoryOnSale,
  getInventory,
};
