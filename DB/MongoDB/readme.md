1. Download MongoDB

2. Move the unzipped file to `Users/tf`

3. Rename it to a more friendly name e.g. mongodb

4. Create a new folder called `mongodb-data` where our databases data is going to be stored

5. ```bash
   cd ~
   pwd # copy output
   ___/mongodb/bin/mongod --dbpath=___/mongodb-data # ___ = copied from previous line
   ```

   A connection was opened on the mongodb default port 27017.

6. stuff was added to the folder `mongodb-data`. 

7. Download the mongodb GUI if necessary from [here](https://robomongo.org/download).

# CRUD operations

While the connection with mongodb is made:

```js
const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017'; // IP instead of localhost - works better
const documentName = 'some-name';

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (err, client) => {
  // cb called when the connection to the db is made
  
  if(err) throw err;
  
	const db = client.db(documentName)
  
  // CREATE
  
  db.collection('users').insertOne({ // insert a document in the 'users' collection
    name: 'Tiago' 
  }, (err, result) => {
    if (err) throw err;
    
		console.log(result.ops); // { name: 'Tiago', _id: 24sdlkfhasldhg }
 		console.log(result.insertedCount); // 1
  });
  
  db.collection('users').insertMany([
    {
      name: 'Ze',
      surname: 'Xavier'
    },
    {
      name: 'Zeca',
      surname: 'Afonso'
    }
  ], (err, result) => {
    // same
  })
  
  // READ
  
  // by a normal field
  db.collection('users').findOne({ name: 'Tiago' }, (err, user) => {
    if (err) throw err;
    
    console.log(user);
  })
  
  // by id
  db.collection('users').findOne({ _id: new ObjectID("24sdlkfhasldhg") }, (err, user) => {
    if (err) throw err;
    
    console.log(user);
  })
  
  // many
  db.collection('users').find({ name: 'Tiago' }).toArray((err, users) => {
    console.log(users);
  })
  // many doesn't have a callback, but rather several methods to be called on e.g. toArray or count
  
  // UPDATE
  // one
  db.collection('users').updateOne(
    { name: 'Tiago' },
    { $set: { name: 'Xavier' } } // $set is one of the available update opertators, like $inc
  )
  	.then(result => console.log(result))
  	.catch(err => console.log(err));
  
  // many
  db.collection('users').updateMany({
    completed: false
  }, {
    $set: {
      update: true
    }
  }).then(...).catch(...);
  
  // DELETE
  // one
  db.collection('users').deleteMany({ name: 'Tiago' }).then(...).catch(...);
})
```



# Mongoose

Has a nice feature of building object models. These models are references for the structure to be used inside our database. It is, then, an ODM - Object Document Mapper, since it maps objects to documents. It is also possible to validate our documents (useful for emails, for example).

Connect mongoose to the database:

```js
//  src/db/mongoose.js

const mangoose = require('mangoose');

mongoose.connect('mongodb://127.0.0.1:27017/some-name', {
  useNewUrlParser: true,
  useCreateIndex: true
});
```



```js
//  user.js

const mangoose = require('mangoose');
const validator = require('validator'); // useful to validate users' inputs

const User = mongoose.model('User', {
  name: {
    type: String,
    default: 'Anonymous',
    trim: true
  },
  age: {
    type: Number,
    validate(val) {
      if (val < 0) throw new Error('Age must be a positive number')
    }
  },
  email: {
    type: String,
    required: true,
    validate(val) {
      if (!validator.isEmail(val)) throw new Error('Email is invalid')
    }
  }
});

module.exports = User;
```

to use this model:

```js
//  index.js

require('./db/mongoose.js'); // establish a connection to the database
const User = require('./models/user.js'); // get the User model

// notice how a new user is created by using the new keyword and passing in an object
const user = new User({
  name: 'Tiago',
  age: 29
})

// save the newly created user to the connected database
user.save()
  .then( () => console.log('saved') )
  .catch( err => console.log(err) );
```

Using with express:

```js
const app = express();

// GET
app.get('/users', (req, res) => {
  User.find({})
  	.then( users => res.send(users) )
  	.catch( () => res.status(500).send() );
});

app.get('users/:id', (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then( user => {
	    if (!user) return res.status(404).send();
    	res.send(user);
  	}).catch( () => res.send(500) );
})

// POST
app.use( express.json() );
app.post('/users', (req, res) => {
  const user = new User(req.body);
  user.save()
    .then( () => res.status(201).send(user) )
    .catch( e => res.status(400).send(e) );
  
  // UPDATE
  app.patch('/users/:id', async (req, res) => {
    const allowedParams = ['name', 'age', 'address'];
    const params = Object.keys(req.body);
    const isAllowed = params.every(param => allowedParams.includes(param));
    
    if(!isAllowed) return res.status(404).send({ error: 'Update not allowed.'});
    
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!user) return res.status(404).send()l
      res.send(user);
    } catch (e) {
      res.status(400).send(e);
    }
  })
  
  // DELETE
  app.delete('/users/:id', (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) return res.status(404).send();
      res.send(user);
    } catch(e) {
      res.status(500).send(e);
    }
  })
});
```

Notice that it is not necessary to convert the string id into an ObjectID, as it was for mongodb, since mongoose is doing that for us.

It is possible to chain promises with the mongoose api:

```js
User.findByIdAndDelete('sadkjhfgas')
  .then( user => User.countDocuments({}) ) // return another promise ( User.countDocumes )
	.then( result => console.log(result) )
	.catch( e => console.log(e) );
```

## Routing

Instead of calling all these endpoints on the app, it makes more sense to apply them in a dedicated route that will, in turn, be appended to the app. This can be achieved my doing the following:

```js
// routers/user.js

const User = require('../models/user');
const router = new express.Router();

router.create(...);
router.remove(...);
router.patch(...);
router.delete(...);

module.exports = router;
```



```js
// index.js
const userRouter = require('./routers/user.js');
app.use(userRouter);

// app.user(anotherRouter);
```

??Instead of having all the related APIs sparse throughout the file, we can group them. It's more organized. Notice how all the CRUD operations we did in the snippet above were targeting the same route `/users`. We can group them this way: