const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const path = require("path");
const hbs =  require("hbs");
require("./db/conn");
const Post = require("./models/posts");

const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : false}))
app.use(express.static(publicPath));
app.set("view engine", "hbs");
app.set("views", viewsPath)
hbs.registerPartials(partialsPath);

app.get("/", async(req, res) => {
    res.render("home");
})

app.get("/about", (req, res) => {
    res.render("about");
})

app.get("/blogs", async(req, res) => {
    const blogs = await Post.find();
    res.render("blogs", {blogs});
})

app.get("/blogs/:id", async(req, res) => {
    const _id = req.params.id;
    const blog = await Post.find({_id});
    const [{postTitle, postContent}] = blog;
    res.render("blog", {
        postTitle : postTitle,
        postContent : postContent
    })
})

app.get("/compose", (req, res) => {
    res.render("compose");
})

app.post("/compose", async(req, res) => {
    try{
        const {postTitle, postContent} = req.body;
        const post1 = new Post({postTitle, postContent});
        const result = await post1.save();
        res.redirect("/blogs");
    }catch(err){
        res.status(400).send(err)
    }
}) 



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("server started listening request on port", port)
})