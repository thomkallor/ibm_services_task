require("../models/index");

async function up() {
  const user = { username: "admin", password: "password" };
  await this("User").create(user, function (err) {
    if (err) return console.error(err);
  });
}

async function down() {
  await this("User").deleteOne({ username: "admin" }, function (err) {
    return console.error(err);
  });
}

module.exports = { up, down };
