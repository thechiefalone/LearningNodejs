const express = require("express");
const cookieParser = require("cookie-parser");

const port = process.env.PORT || 3000;

const app = express();
app.use(cookieParser());

app.get("/bla", (req, res) => {
  if (!req.cookies.blabla) {
    let cookieData = {
      visitDate: Date(Date.now()).toString(),
      visitNumber: 1
    };
    res.cookie("blabla", cookieData);
    res.send("cookie saved and this is the first visit");
  } else {
    let visitDate = req.cookies.blabla.visitDate;
    let visitNumber = req.cookies.blabla.visitNumber;
    let cookieData = {
      visitDate: Date(Date.now()).toString(),
      visitNumber: visitNumber + 1
    };
    res.cookie("blabla", cookieData);
    res.send(
      "last visit : " + visitDate + "<br>visits Number : " + visitNumber
    );
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
