// router
const express = require("express");
const router = express.Router();
// db
const mongoose = require("mongoose");
const Post = mongoose.model("Post");
// local
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/posts", (req, res) => {
  Post.find()
    .populate("postedBy", "_id name")
    .then(posts => res.json({ posts }))
    .catch(err => console.log("There was an error fetching the posts", err));
});

router.get("/my-posts", isLoggedIn, (req, res) => {
  Post.find({ postedBy: req.user._id })
    .populate("postedBy", "_id title body photo")
    .then(posts => res.send(posts))
    .catch(error => res.json({ error }));
});

router.post("/create-post", isLoggedIn, (req, res) => {
  const { title, body, image } = req.body;

  if (!title || !body) res.status(422).json({ error: "Please fill in all inputs." });

  // - title and body filled in - //
  const newPost = new Post({ title, body, image, postedBy: req.user });
  newPost
    .save()
    .then(createdPost => res.json({ message: "Posted successfully!", post: createdPost }))
    .catch(err => console.log("There was an error creating the post", err));
});

module.exports = router;
