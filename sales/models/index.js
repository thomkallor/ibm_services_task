var mongoose = require("mongoose");
var Sale = require("./sales");

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL);
};

const models = {
  Sale,
};

module.exports = {
  connectDb,
  default: models,
};
