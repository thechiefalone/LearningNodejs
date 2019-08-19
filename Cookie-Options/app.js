const express = require("express");
const cookieParser = require("cookie-parser");

const port = process.env.PORT || 3000;
const app = express();
app.use(cookieParser());

app.get("/createCookie", (req, res) => {
  res.cookie(
    "mortalCookie",
    { createDate: Date(Date.now()).toString() },
    { expires: new Date(Date.now() + 60000) }
  );
  res.send("one minute cookie has been saved");
});

app.get("/readCookie", (req, res) => {
  if (req.cookies.mortalCookie) {
    res.send("cookie created time : " + req.cookies.mortalCookie.createDate);
  } else {
    res.send("I can not recognize this cookie");
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
