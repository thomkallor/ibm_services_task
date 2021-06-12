var { Sale } = require("../models/index");

async function up() {
  const sales = [
    {
      model: "Accord",
      color: "Red",
      year: 2012,
      quantity: 4,
      soldOn: new Date("2020-06-11"),
    },
    {
      model: "Punto",
      color: "White",
      year: 2014,
      quantity: 3,
      soldOn: new Date("2020-06-11"),
    },
    {
      model: "Fiesta",
      color: "Black",
      year: 2016,
      quantity: 2,
      soldOn: new Date("2020-06-12"),
    },
    {
      model: "Fiesta",
      color: "Blue",
      year: 2016,
      quantity: 2,
      soldOn: new Date("2020-06-12"),
    },
  ];
  Sale.insertMany(sales, function (err) {
    return console.error(err);
  });
}

async function down() {
  Sale.deleteMany(function (err) {
    return console.error(err);
  });
}

module.exports = { up, down };
