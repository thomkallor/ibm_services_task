require("../models/index");

async function up() {
  const sales = [
    {
      model: "accord",
      color: "red",
      year: 2012,
      quantity: 1,
      soldAt: "2020/06/11",
    },
    {
      model: "punto",
      color: "white",
      year: 2014,
      quantity: 1,
      soldAt: "2020/06/11",
    },
    {
      model: "fiesta",
      color: "black",
      year: 2016,
      quantity: 1,
      soldAt: "2020/06/12",
    },
    {
      model: "fiesta",
      color: "blue",
      year: 2016,
      quantity: 1,
      soldAt: "2020/06/12",
    },
  ];
  await this("Sale").insertMany(sales);
}

async function down() {
  await this("Sale").deleteMany({});
}

module.exports = { up, down };
