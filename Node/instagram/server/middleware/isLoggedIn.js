const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../keys')
const mongoose = require('mongoose');
const User = mongoose.model("User")

const isLoggedIn = (req, res, next) => {
  const { authorization } = req.headers; // 'Bearer <token>'

  if (!authorization)
    return res.status(401).json({ error: "You must be logged in!" })

  const token = authorization.replace("Bearer ", "");

  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err)
      return res.status(401).json({ error: "You must be logged in!" });

    // - token matches - //
    User.findById(payload._id)
      .then(userData => {
        userData.password = undefined;
        req.user = userData;
        next();
      })
      .catch(err => console.log(err));
  });

}

module.exports = isLoggedIn;