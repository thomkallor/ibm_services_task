require("../models/index");

async function up() {
  const stocks = [
    {
      model: "accord",
      color: "red",
      year: 2012,
      quantity: 4,
    },
    {
      model: "punto",
      color: "white",
      year: 2014,
      quantity: 3,
    },
    {
      model: "fiesta",
      color: "black",
      year: 2016,
      quantity: 2,
    },
    {
      model: "fiesta",
      color: "blue",
      year: 2016,
      quantity: 2,
    },
  ];
  await this("Inventory").insertMany(stocks);
}

async function down() {
  await this("Inventory").deleteMany({});
}

module.exports = { up, down };
