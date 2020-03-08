const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const serviceAccount = require("C:/Users/tiago/Downloads/socialape-1089c01caa48.json");

const app = express();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://screams.firebaseio.com"
});

const db = admin.firestore();

app.get("/screams", (req, res) => {
  db.collection("screams")
    .orderBy("createdAt", "desc")
    .get()
    .then(data => {
      let screams = [];
      data.forEach(doc => {
        screams = [...screams, doc.data()];
      });
      return res.json(screams);
    })
    .catch(err => console.error(err));
});

app.post("/scream", (req, res) => {
  const newScream = {
    body: req.body.body,
    userHandle: req.body.userHandle,
    createdAt: new Date().toISOString()
  };

  db.collection("screams")
    .add(newScream)
    .then(doc => {
      res.json({ message: `Document ${doc.id} created successfully, my dude.` });
    })
    .catch(err => {
      res.status(500).json({ error: "Something went wrong, my dude." });
      console.error(err);
    });
});

exports.api = functions.region("europe-west1").https.onRequest(app);
