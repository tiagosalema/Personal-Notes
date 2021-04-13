const express = require('express');

const app = express();

app.use(express.json());

app.post('/notes', (req, res) => {
  console.log(req.body);
  res.send('testing')
})

app.listen(3000)