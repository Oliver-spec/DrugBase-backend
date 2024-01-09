const express = require("express");
const logger = require("./middlewares/logger");
const getRouter = require("./routes/get");
const postRouter = require("./routes/post");
const deleteRouter = require("./routes/delete");
const patchRouter = require("./routes/patch");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(express.json());
app.use(logger);
app.use(getRouter);
app.use(postRouter);
app.use(deleteRouter);
app.use(patchRouter);
app.use(errorHandler);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server startup at ${new Date().toLocaleString()}`);

  console.log(`Listening on port ${port}`);
});
