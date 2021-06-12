var mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
  color: String,
  model: String,
  year: Number,
  quantity: Number,
  soldAt: Date,
});

const Sale = mongoose.model("Sale", saleSchema);

module.exports = Sale;
