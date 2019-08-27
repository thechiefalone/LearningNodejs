const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const sql = require("./Controllers/sql");
const app = express();
const port = process.env.PORT || 3000;

console.log(process.env.mysqlhost);

app.get("/testConnection", (req, res) => {
  sql
    .connect()
    .then(() => {
      res.send("Connected");
    })
    .catch(error => {
      res.send(error);
    });
});
app.get("/customers", (req, res) => {
  sql
    // .sqlQuery("SELECT customerName from customers ORDER BY customerName ASC ")
    .sqlQuery(
      //   "SELECT customerName from customers WHERE customerName like 'a%' "
      "SELECT concat(contactFirstName, ' ', contactLastName, ' ', country) as customerName from customers WHERE country like 'USA' ORDER BY customerName ASC"
    )
    .then(result => {
      let content = "";
      result.forEach(element => {
        content += element.customerName + "<br>";
      });
      res.send(content);
    })
    .catch(error => {
      res.send(error);
    });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
