const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.PORT || 4000;

app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Welcome to Cookies");
});

let user = {
  username: "alperenozkan@gmail.com  ",
  userid: "23487654329875"
};

app.get("/savecookie", (req, res) => {
  res.cookie("userData", user);
  res.send("cookie has been saved");
});

app.get("/getcookie", (req, res) => {
  console.log(req.cookies.userData.username);
  res.send(req.cookies.userData);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
