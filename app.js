const express = require("express");
const app = express();
const cors = require('cors')
require("dotenv").config();
const PORT = process.env.PORT || 8000;

const todoRouter = require("./routes/todoRoute");
const userRouter = require("./routes/userRoute");

const mongoose = require("mongoose");

const url = `${process.env.DB_URL}`;
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose
  .connect(url, connectionParams)
  .then(() => {
    console.log("Connected to the database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. ${err}`);
  });

app.use(express.json())
app.use(cors())
app.use("/api/v1/todos", todoRouter);
app.use("/api/v1/users", userRouter);
app.all('*', (req, res) => {
  return res.status(404).json({
    message: `${req.originalUrl} not found`
  })
});

app.listen(PORT, () => console.log(`server is listening on port: ${PORT}`));
