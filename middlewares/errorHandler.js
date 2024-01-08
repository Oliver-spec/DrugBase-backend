function errorHandler(err, req, res, next) {
  if (err.name === "ZodError") {
    console.error(err.stack);

    const formattedError = {
      name: err.name,
      message: JSON.parse(err.message),
    };

    res.status(400).type("application/json").send(formattedError);
  } else {
    console.error(err.stack);

    const formattedError = {
      name: err.name,
      message: err.message,
    };

    res.status(500).type("application/json").send(formattedError);
  }
}

module.exports = errorHandler;
