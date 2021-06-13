require("../models/index");

async function up() {
  const user = { username: "admin", password: "password" };
  await this("User").create(user);
}

async function down() {
  await this("User").deleteOne({ username: "admin" });
}

module.exports = { up, down };
