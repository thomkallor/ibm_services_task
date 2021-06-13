require("../models/index");

async function up() {
  const stocks = [
    {
      model: "Accord",
      color: "Red",
      year: 2012,
      quantity: 4,
      soldAt: new Date("2020-06-11"),
    },
    {
      model: "Punto",
      color: "White",
      year: 2014,
      quantity: 3,
      soldAt: new Date("2020-06-11"),
    },
    {
      model: "Fiesta",
      color: "Black",
      year: 2016,
      quantity: 2,
      soldAt: new Date("2020-06-12"),
    },
    {
      model: "Fiesta",
      color: "Blue",
      year: 2016,
      quantity: 2,
      soldAt: new Date("2020-06-12"),
    },
  ];
  await this("Inventory").insertMany(stocks);
}

async function down() {
  await this("Inventory").deleteMany({});
}

module.exports = { up, down };
