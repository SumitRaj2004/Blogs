const express = require("express");
const Post = require("../models/posts");
const router = express.Router();

router.get("/", async(req, res) => {
    const blogs = await Post.find();
    res.render("blogs", {blogs});
})

router.get("/:id", async(req, res) => {
    const _id = req.params.id;
    const blog = await Post.find({_id});
    const [{postTitle, postContent}] = blog;
    res.render("blog", {
        postTitle : postTitle,
        postContent : postContent,
        _id : _id
    })
})

router.get("/update/:id", async(req, res) => {
    const {id:_id} = req.params;
    const blog = await Post.find({_id});
    const [{postTitle, postContent}] = blog;
    res.render("update", {
        postTitle : postTitle,
        postContent: postContent,
        _id : _id
    })
})

router.put("/update/:id", async(req, res) => {
    const {id:_id} = req.params;
    const blog = await Post.findByIdAndUpdate(_id, req.body);
    res.redirect("/blogs");
})

router.delete("/delete/:id", async(req, res) => {
    const {id:_id} = req.params;
    await Post.findByIdAndDelete(_id);
    res.redirect("/blogs")
})


module.exports = router;