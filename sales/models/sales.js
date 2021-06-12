var mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
  color: String,
  model: String,
  year: Number,
  quantity: Number,
  soldOn: Date,
});

const Sale = mongoose.model("Sale", saleSchema);

module.exports = Sale;
