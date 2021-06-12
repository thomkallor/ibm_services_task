var mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  color: String,
  model: String,
  year: Number,
  quantity: Number,
});

const Inventory = mongoose.model("Inventory", inventorySchema);

module.exports = Inventory;
