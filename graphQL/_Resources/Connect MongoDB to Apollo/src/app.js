const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema')
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

const connectionString = "";

app.use(cors()); // This is to allow the use of info in port 4000 (the one being listened here) in other ports

mongoose.connect(connectionString, { useNewUrlParser: true })
mongoose.connection.once('open', () => {
  console.log("Connected to database, my guy.");
});

app.use('/graphql', graphqlHTTP({ //graphqlHTTP() will fire whenever a request to /graphql comes in
  schema,
  graphiql: true // interface used in the browser
}));

app.listen(4000, () => {
  console.log("Listening for requests on port 4000, my dude.");
})