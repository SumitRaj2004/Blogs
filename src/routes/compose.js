const express = require("express");
const Post = require("../models/posts");
const router = express.Router();

router.get("/", async(req, res) => {
    res.render("compose")
})

router.post("/", async(req, res) => {
    try{
        const {postTitle, postContent} = req.body;
        const post1 = new Post({postTitle, postContent});
        const result = await post1.save();
        res.redirect("/blogs");
    }catch(err){
        res.status(400).send(err)
    }
})

module.exports = router;