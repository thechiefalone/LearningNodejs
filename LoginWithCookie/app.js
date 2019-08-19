const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "/public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
  res.render("login");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
