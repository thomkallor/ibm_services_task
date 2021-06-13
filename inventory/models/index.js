var mongoose = require("mongoose");
var Inventory = require("./inventory");

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

const models = {
  Inventory,
};

module.exports = {
  connectDb,
  models,
};
