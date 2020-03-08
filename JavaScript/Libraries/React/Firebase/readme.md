<h1 style="position: absolute; right:0px">Firebase</h1>



1. `firebase init`

2. `firebase deploy` / `firebase serve`
   This will deploy the new saved file. Every time we make a change we have to deploy, unless we serve, where the deploy is being watched. If we serve, we have to create a credential [here](console.developers.google.com/apis/credentials) (be sure to select the right project) and save it wherever. Then, in `index.js`:

   ```js
   const serviceAccount = require("C:/Users/tiago/Downloads/<FILE_NAME>.json");
   admin.initializeApp({
     credential: admin.credential.cert(serviceAccount),
     databaseURL: "https://<PROJECT_NAME>.firebaseio.com"
   });
   ```

   

# Old-fashioned way

## GET

```JS
// index.js
exports.getData = functions.https.onRequest((req, res) => {
  db.collection("collectionName")
    .get()
    .then(collection => {
      let cars = [];
      collection.forEach(car => {
        cars = [...cars, car.data()];
      });
      return res.json(cars);
    })
    .catch(err => console.error(err));
});
```

## CREATE

```js
exports.createCar = functions.https.onRequest((req, res) => {
  if (req.method !== "POST") return res.status(400).json({ message: "Method not allowed." });

  const newCar = {
    body: req.body.body,
    user: req.body.user,
    createdAt: admin.firestore.Timestamp.fromDate(new Date())
  };

  db.collection("cars")
    .add(newCar)
    .then(car => {
      res.json({ message: `Document ${car.id} created successfully.` });
    })
    .catch(err => {
      res.status(500).json({ error: "Something went wrong." });
      console.error(err);
    });
});
```

# Using express

Instead of exporting each and every one of those functions, it would be smart to export only one (e.g. `exports.api`) and run different CRUD operations from there using express:

```js
const express = require("express");
const app = express();

app.get("/screams", (req, res) => {...} )
app.post("/scream", (req, res) => {...} )
exports.api = functions.region("europe-west1").https.onRequest(app);
// region added to run from europe instead of us
```

