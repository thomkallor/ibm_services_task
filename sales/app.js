var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var dotenv = require("dotenv");

var { authenticateToken } = require("./middleware/authentication");

var { connectDb } = require("./models/index");
var indexRouter = require("./routes/index");
var salesRouter = require("./routes/sales");

dotenv.config();
connectDb();
var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
// authentication middleware
app.use(authenticateToken);
app.use("/sales", salesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // send error
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
