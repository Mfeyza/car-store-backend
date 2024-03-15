"use strict";

const express = require("express");
const cors = require('cors');
const app = express();

app.use(express.json());
require("dotenv").config();
const PORT = process.env.PORT;
const HOST = process.env.HOST;

require("./src/configs/dbConnection"); //! burası dotenv den sonra !!!!!

const session = require("cookie-session");
app.use(
  session({
    secret: process.env.SECRET_KEY,
  })
);
app.use(require("./src/middlewares/postCors"))
app.use(require("./src/middlewares/auth"));
app.use(require("./src/middlewares/query"));

app.all("/", (req, res) => {
  res.send({
    error: false,
    message: "welcome store",
    loginUser: req.session,
  });
});

app.use("/product", require("./src/routes/productRouter"));
app.use("/user", require("./src/routes/userRouter"));

app.use(require("./src/middlewares/errorHandler"));

app.listen(PORT, () => console.log(`Server Running on http://${HOST}:${PORT}`));
// require('./src/sync')()
