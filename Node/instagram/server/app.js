// Modules
const express = require("express");
const mongoose = require("mongoose");
// Models
require("./models/users");
require("./models/post");
// Routes
const auth = require("./api/auth");
const posts = require("./api/posts");
// Extras
const PORT = process.env.PORT || 8000;
const { MONGOURI } = require("./keys");

mongoose.connection.on("connected", () => console.log("Connected to MongoDB."));
mongoose.connection.on("error", err => console.log("Could't connect to MongoDB.", err));
mongoose.connect(MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

app.use(express.json()); // parses JSON requests to the server

// Routes
app.use(auth).use(posts);

app.listen(PORT, () => console.log(`server is running on port ${PORT}...`));
