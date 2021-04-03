## Configure a basic express

```js
app.get('/', (req,res) => res.send('Hello World!'))
app.listen(PORT, () => console.log('Server is running on port ,' PORT))
```



## Start a project in Mongodb Atlas

1. Create new project

2. Add IP address (in `Network access`)

3. Add new user
  `Database Access` / `Add New Database user` 

  The password used for this user will be used in the api to establish a connection between our app server and the db.

4. Connect the user to the database

  `Clusters` / `Connect` / `Connect your application`

  Copy link to the server (don't forget to replace `<password>` with the user password)

  ```js
  // keys.js
  module.exports = { MONGOURI: 'mongodb+srv://tiago:Jsdd966...' }
  ```



## Connect to mongoose

```js
const { MONGOURI } = require('./keys');
mongoose.connect(MONGOURI)
mongoose.connection.on('connected',() => /* connected to mongo */);
mongoose.connection.on('error', err => /* error */);
```



## Create a new user schema.

```js
// models/user.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name:			{ type: String, required: true },
  email:		{ type: String, required: true },
  password: { type: String, required: true },
})

mongoose.model("User", userSchema) // model "User" with the userSchema schema has been created
```

```js
// app.js
require('models/user')
mongoose.model("User"); // to use the model
```



## Authentication

### Create routes

```js
//routes/auth.js
router.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  
  if(!name || !email || !password) return res.status(422).json({ error: "Some fields are missing!" })
  return res.json({ message: "Signed up successfully." }) // *1
})
```

To test this route it's easier to use a software like Postman than going to the browser and go to `localhost:5000/signup`. To do so, set the `Content-Type` header to `Application/json` and send the raw data

```json
{
  "name": "John",
  "email": "johndoe@mail.com",
  "password": "password1"
}
```

to that url. As this data is raw, it's necessary to run a middleware in our server to parse it as JSON before running our routes.

```js
app.use(express.json())
```

This is equivalent to setting the raw data as "JSON" instead of "text".

### Signing up - saving a new user

Although we responded with a message saying that the user was signed up successfully (*1), we didn't create one. To do it:

```js
const User = mongoose.model("User");

// *1
// Check if a user with the given email already exists
User.findOne({email})
  .then(matchedUser => {
    if(matchedUser) return res.status(422).json({ error: "That email has already been registered!" })

    new User({ name, email, password }) // (*2)
      .save()
      .then(() => res.json({ message: "User created successfully" })) // now we created! :)
      .catch(error => res.json({ error }))
  })
	.catch(error => res.json({ error }))
```

If we execute the same previous request in Postman, we can then confirm that our user has been saved to our collection in Mongodb Atlas. Yay!

Note that the password was saved as plain text, though, which brings security risks. We can hash the password before it is stored. Here is an example using bcryptjs:

```js
bcrypt(password, 12).then(hashed => {
  new User({ name, password: hash, email }) // (*2) with hashed password
    .save()
  	// etc
)
```

### Signing in and jwt

```js
User.findOne({ email })
  .then(foundUser => {
  	if(!foundUser) return res.status(422).json({ error: "Invalid email or password." })
  	
  	// email found in the db...
  	bcrypt.compare(password, foundUser.password)
  		.then(doMatch => {
      	if(!doMatch) return res.status(422).json({ error: "Invalid email or password." })
      
      	// password for the found email is correct...
      	const token = jwt.sign({ _id: foundUser._id }, JWT_KEY)
        res.json({ token })
	    })
	})
```

where `JWT_SECRET`  is a random string declared in keys.js.

Now that a jwt whose id is similar to the user's was created and attached to the response, we must create a middleware that confirms its validity when another secured route is visited.

```js
// middleware/requireLogin.js
module.exports = (req, res, next) => {
  const { authorization } = req.headers

	if(!authorization) return res.status(401).json({ error: "login required" })

  // a token was found...
	const token = authorization.replace("Bearer ", "")
  
	jwt.verify(token, JWT_SECRET, (err, payload) => {
		if(err) return res.status(401).json({ error: "login required" })

    // the token is correct
		User.findById(payload._id).then(user => {
			req.user = user // middleware passes through the user object by attaching it to the req object
			next()
    })     
	})
}
```

This middleware can be used as

```js
import middleware from 'middleware/requireLogin'
router.get("/some-secured-route", middleware, (req, res) => { /* ... */ })
```

The usefulness of the jwt is that it can be stored locally (on the client side). Before every request that requires authentication, we can get it and send it in the headers:

```js
localstorage.setItem('jwt', token)
localstorage.setItem('user', JSON.stringify(user))

fetch("/protectedRoute", {
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + localstorage.getItem('jwt')
  }
})

```





## Create a new post

Before creating a post we need to define its schema.

```js
// models/post.js
import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema.Types

const requiredString = { type: String, required: true };
const userObj = { type: ObjectId, ref:"User" };

const postSchema = new mongoose.Schema({
    title: requiredString,
    body: requiredString,
    photo: requiredString,
  	postedBy: userObj,
    likes: [ userObj ],
    comments: [
      { text: String, postedBy: userObj }
    ]
}, { timestamps: true })

mongoose.model("Post", postSchema)
```

Note that this file only needs to be called in the main app for the model to be registered

```js
// app.js
require('./models/post') // no need to assign it to a variable
```

Now we can build the route where the request to create a new post will be made:

```js
// routes/post.js
router.post('/create-post', requireLogin, (req, res) => {
  const { title, body, user: postedBy } = req.body;
  if(!title || !body) return res.status(401).json({ error: "Please fill in all fields" })
  
  // Post title and body was provided...
  user.password = undefined;
	new User({ title, body, postedBy })
  	.save()
    .then(post => res.json({ post }))
})
```

Requests to this router to work need an Authorization header with a valid bearer (generated during log in) i.e. "Bearer \<token\>"



## Get all posts

```js
// routes/post.js
router.get('/posts', (req, res) => {
  Post.find()
  	.populate("postedBy", "_id name") // (*3)
    .then(posts => res.status(200).json({ posts }))
})
```

If the mongoose built-in method `populate` (*3) wouldn't have been used, the returned response `res` would have been all the posts with the property `postedBy` being the id of the user who posted it. By calling `populate` and specifying `postedBy` as its first parameter, we are asking this property to be converted from that id code to its content i.e. the user object with that id. That user object has many properties (\_id, name, email, password, etc.). We can choose to return in `res` only a few. In this case, we chose only `_id` and `name`.



## Get all posts by user

```js
// routes/post.js
router.get('/my-posts', requireLogin, (req, res) => Post.find({ postedBy: req.user._id }).etc. )
```



## Images - Cloudinary

+ Create a dedicated area for our site's pictures:
  1. Settings
  2. Upload
  3. Enable unsigned uploading
  4.  Add upload presets
  5. Give it a name e.g. instagram_clone. This name will be used in the FormData.
  6. Signing mode - unsigned
  7. Save

```js
const formData = new FormData()
formData.append("file", image)
formData.append("upload_preset", "instagram_clone")
formData.append("cloud_name", "my-cloud-name")

formData.fetch("https://api.cloudinary.com/v1_1/my-cloud-name/image/upload", { method: "post", body: data })
	.then(res => res.json())
	.then(data => { /* update state with image url */ })
	.catch(err => {})
```

Url obtained from the cloudinary homepage (API Base URL) + "/image/upload".

## Frontend integration

To overcome the response blockage due to the CORS policy between 2 different origins, we can either use a middleware from e.g. the `cors` node package:

```js
// app.js
app.use(cors());
```

or use [React's proxy](https://create-react-app.dev/docs/proxying-api-requests-in-development/), which tells the development server to proxy any unknown requests to the API server:

```json
// package.json
	"proxy": "http://localhost:4000",
```

