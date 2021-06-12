var mongoose = require("mongoose");
var User = require("./users");

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL);
};

const models = {
  User,
};

module.exports = {
  connectDb,
  default: models,
};
