var { User } = require("../models/index");

async function up() {
  let user = new User({ username: "admin", password: "password" });
  user.save(function (err, _) {
    if (err) return console.error(err);
  });
}

async function down() {
  User.deleteOne({ username: "admin" }, function (err, _) {
    return console.error(err);
  });
}

module.exports = { up, down };
