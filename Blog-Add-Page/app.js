const express = require("express");
const app = express();
const path = require("path");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "/public")));

const port = process.env.PORT || 3000;

let allBlogPosts = [
  { blogTitle: "First Blog", blogPost: "This is my first blog" },
  { blogTitle: "Second Blog", blogPost: "This is my second blog" },
  { blogTitle: "Third Blog", blogPost: "This is my third blog" }
];

app.get("/blog", (req, res) => {
  res.render("blog", { allBlogPosts: allBlogPosts });
});

app.get("/add-blog", (req, res) => {
  res.render("add-blog");
});

app.post("/add-blog", (req, res) => {
  let blogTitle = req.body.blogTitle;
  let blogPost = req.body.blogPost;
  let newBlog = { blogTitle: blogTitle, blogPost: blogPost };
  allBlogPosts.push(newBlog);
  res.redirect("/blog");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
