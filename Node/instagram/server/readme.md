1. configure a basic express
  + npm i express
  + npm i -D nodemon
  + app.get('/')
  + app.listen()
2. create a new project in mongodb atlas
  + Add IP address
    + Network access
    + add IP address
    + allow access from anywhere (for now)
  + Add new user
    + Database access
    + Add New Database user
    + password used by this user will be used in the api - copy it to the server
  + Connect to the Database
    + Clusters
    + Connect
    + Connect your application
    + Copy link
    + store it somewhere in the app with the created user password replaced in `<password>` e.g. in keys.js: module.exports.MONGOURI
3. connect to mongoose
  + npm i mongoose
  + mongoose.connect(MONGOURI)
  + mongoose.connection.on('connected',()=>())
4. Create a new User Schema
  + /models/user.js
5. Authentication
  +  routes/auth.js
    + router.post('/signup', cb)
    + router.post('/signin', cb)
  + hash password with bcrypt
  + use jsonwebtoken library to story a jwt when user is loggen in
    + Create JWT_SECRET (random string) in keys.js
    + Create middleware to confirm the user is logged in to insert before all routes that require auth
      + middleware/isLoggedIn.js
      + create token when user logs in and append it to their request headers as "Bearer <token>"
6. Create a new Post Schema
  + routes/post.js
    + create (token required (include the middleware `isLoggedIn` in this route) - for now, append an Authorization header with "Bearer <token>", where <token> is the token created when the user logs in)
      + import ObjectId from mongoose.Schema.types to reference the user who posted
    + get posts (/posts, /my-posts)
      + Retrieves postedBy `id`. To populate this field with user details:
        ```js
        Post.find().populate("postedBy", "_id name")
        ```
        If 2nd argument isn't inserted, all fields will populate the user (inc. password)
