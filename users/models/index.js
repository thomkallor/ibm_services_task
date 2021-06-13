var mongoose = require("mongoose");
var User = require("./users");

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

const models = {
  User,
};

module.exports = {
  connectDb,
  models,
};
