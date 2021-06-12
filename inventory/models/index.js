var mongoose = require("mongoose");

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL);
};

const models = {};

module.exports = {
  connectDb,
  default: models,
};
