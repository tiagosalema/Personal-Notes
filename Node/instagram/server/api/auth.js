// router
const express = require("express");
const router = express.Router();
// db
const mongoose = require("mongoose");
const User = mongoose.model("User");
// secret
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");

router.get("/", (req, res) => {
  res.send("hello from /");
});

// SIGNUP
router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  console.log({ name, email, password });

  if (!name || !email || !password)
    return res.status(422).json({ error: "Please, fill in all the required inputs." });

  // - All inputs were provided - //

  User.findOne({ email })
    .then(savedUser => {
      if (savedUser) return res.status(422).json({ error: "That email is already in use." });

      // - The email has not been taken yet - //

      bcrypt.hash(password, 12).then(hashedPassword => {
        const user = new User({ name, email, password: hashedPassword });
        user
          .save()
          .then(user => res.json({ message: "User saved successfully!" }))
          .catch(err => console.log(err));
      });
    })
    .catch(err => console.log(err));
});

// SIGN IN
router.post("/signin", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "Please, fill in both email and password." });

  // - email and password were provided - //

  User.findOne({ email }).then(foundUser => {
    if (!foundUser)
      return res.status(400).json({ error: "The provided email and password don't match." });

    // - a user with the provided email was found - //

    bcrypt
      .compare(password, foundUser.password)
      .then(match => {
        if (!match)
          return res.status(400).json({ error: "The provided email and password don't match." });

        // - password matches username: LOGGED IN! - //
        const { _id, name, email } = foundUser;

        const token = jwt.sign({ _id: foundUser._id }, JWT_SECRET);
        res.json({ token, user: { _id, name, email } });
      })
      .catch(err => console.log(err));
  });
});

module.exports = router;
