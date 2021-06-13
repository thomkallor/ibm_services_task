var axios = require("axios");
var { models } = require("../models/index");
var Sale = models.Sale;
const { validationResult } = require("express-validator");

// Get nextday from the current day
const getNextDay = (date) => {
  // one day in ms
  const one_day_ms = 86_400_000;
  const timeStamp = date.getTime();
  const nextDay = new Date(timeStamp + one_day_ms);
  return nextDay;
};

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
    soldAt: new Date(),
  });
  const updateURI = process.env.INVENTORY_UPDATE_ENDPOINT;

  /* 
  Update the inventory on sale.
  Normally would be an event pushed to a publisher,
  so other functionalities could be carried out (billing, despatching).
  Made an API request and logged errors for simplicity.
  */
  axios
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
  const { color, model, year, soldAt } = req.query;
  if (color) {
    query.color = color;
  }
  if (model) {
    query.model = model;
  }
  if (year) {
    query.year = parseInt(year);
  }
  if (soldAt) {
    const date = new Date(soldAt);
    const soldAtQuery = {
      $gte: date,
      $lt: getNextDay(date),
    };
    query.soldAt = soldAtQuery;
  }
  if (query) {
    query = [
      { $match: query },
      { $group: { _id: null, numOfSales: { $sum: "$quantity" } } },
    ];
  }
  const sale = await Sale.aggregate(query);
  return res.status(200).json(sale);
};

module.exports = {
  createSale,
  getSalesCount,
};
