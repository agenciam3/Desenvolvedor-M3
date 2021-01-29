const express = require("express");
var fs = require("fs");
var data = JSON.parse(fs.readFileSync("./produtos.json", "utf8"));
const app = express();
const port = 3000;
const cors = require("cors");

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.get("/produtos", (req, res) => {
  if (data) {
    res.json(data);
  } else {
    res.status(500).send();
  }
});
