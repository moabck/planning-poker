const express = require("express");
const api = require("./api/");
const app = express();
const PORT = 8080;
const body_parser = require("body-parser");

app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));

app.use((rec, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api", api);

app.listen(PORT, () => console.log(`Running server on port ${PORT}`));
