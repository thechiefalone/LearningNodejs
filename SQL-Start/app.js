const express = require("express");
const mysql = require("mysql");
const app = express();
const port = process.env.PORT || 3000;
const con = mysql.createConnection({
  host: "remotemysql.com",
  port: "3306",
  user: "ofnvbO2YBG",
  password: "mJR7D75VA4",
  database: "ofnvbO2YBG"
});

app.get("/connect", (req, res) => {
  if (con.state === "disconnected") {
    con.connect(error => {
      if (error) {
        res.send(error);
      } else {
        res.send("connected");
      }
    });
  } else {
    res.send("Already Connected");
  }
});

app.get("/connection-status", (req, res) => {
  res.send(con.state);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
