const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const path = require("path");
const hbs =  require("hbs");
const methodOverride = require("method-override");
require("./db/conn");
const Post = require("./models/posts");

// importing routes
const homeRouter = require("./routes/home");
const aboutRouter = require("./routes/about")
const blogsRouter = require("./routes/blogs");
const composeRouter = require("./routes/compose");

// getting different directories path
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

const app = express();  
app.use(express.json());
app.use(express.urlencoded({extended : false}))
app.use(express.static(publicPath));
app.use(methodOverride("_method"));
app.set("view engine", "hbs");
app.set("views", viewsPath)
hbs.registerPartials(partialsPath);
app.use("/", homeRouter);
app.use("/about", aboutRouter)
app.use("/blogs", blogsRouter)
app.use("/compose", composeRouter)

app.listen(process.env.PORT, () => {
    console.log(`server started listening request on port ${process.env.PORT}`)
})