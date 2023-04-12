const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const router = require("./router");

mongoose
  .connect(
    "mongodb+srv://admin-hamse:roUDOlIWv9nP6cq4@cluster0.usjgbo5.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("connected to database"))
  .catch(() => console.log("err with mongodb"));

const app = express();
app.use(cors());
app.use("/public", express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api", router);

app.listen(5000, () => {
  console.log("server started at port http://localhost:5000");
});
