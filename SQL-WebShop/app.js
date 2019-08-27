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
      // "SELECT customerName from customers WHERE customerName like 'a%' "
      // "SELECT concat(contactFirstName, ' ', contactLastName, ' ', country) as customerName from customers WHERE country like 'USA' ORDER BY customerName ASC"
      //   "SELECT orderNumber from orders WHERE (orderDate BETWEEN '2003-02-01' AND '2003-02-28')"
      "SELECT SUM(payments.amount) AS totalAmount from payments INNER JOIN customers on customers.customerNumber=payments.customerNumber WHERE customers.country like 'USA' and payments.paymentDate between '2003-01-01' and '2003-06-01'"
    )
    .then(result => {
      let content = "";
      result.forEach(element => {
        content += element.totalAmount + "<br>";
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
