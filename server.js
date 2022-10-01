const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
//const dotenv = require('dotenv')
require("dotenv").config();
const { readdirSync } = require("fs");

const app = express();

//middleware

app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
//=====
//Route

readdirSync("./routes").map((z) => app.use("/api", require("./routes/" + z)));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server is running on port " + port);
});
