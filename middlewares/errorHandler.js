function errorHandler(err, req, res, next) {
  console.error(err.stack);

  res.send("Server Error");
}

module.exports = errorHandler;
