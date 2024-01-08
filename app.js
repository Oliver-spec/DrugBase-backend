const express = require("express");
const getRouter = require("./routes/get");
const postRouter = require("./routes/post");
const deleteRouter = require("./routes/delete");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(express.json());
app.use(getRouter);
app.use(postRouter);
app.use(deleteRouter);
app.use(errorHandler);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
