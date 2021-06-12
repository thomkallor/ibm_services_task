var mongoose = require("mongoose");
var Inventory = require("./inventory");

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL);
};

const models = {
  Inventory,
};

module.exports = {
  connectDb,
  default: models,
};
