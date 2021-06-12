var axios = require("axios");
var models = require("../models/index");
var Sale = models.Sale;
const { validationResult } = require("express-validator");

/* Create a sale if validations are right */
const createSale = async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { color, model, year, quantity } = req.body;
  const sale = await Sale.create({
    color,
    model,
    year,
    quantity,
    saleOn: new Date(),
  });
  const updateURI = process.env.INVENTORY_UPDATE_ENDPOINT;

  /* 
  Update the inventory on sale.
  Normally would be an event pushed to a publisher,
  so other functionalities could be carried out (billing, despatching).
  Made an API request and logged errors for simplicity.
  */
  await axios
    .put(updateURI, req.body)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });

  return res.status(201).json(sale);
};

/* GET no of sales made based on query params */
const getSalesCount = async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let query = {};
  const { color, model, year } = req.query;
  if (color) {
    query.color = color;
  }
  if (model) {
    query.model = model;
  }
  if (year) {
    query.year = year;
  }
  if (soldOn) {
    query.soldOn = new Date(soldOn);
  }
  if (query) {
    query = [
      { $match: query },
      { $group: { _id: null, numOfSales: { $sum: "$quantity" } } },
    ];
  }

  const sale = await Sale.aggregate(query);
  res.status(200).json(sale);
};

module.exports = {
  createSale,
  getSalesCount,
};
