const express = require('express');
const app = express();

app.get('/sum', (req, res) => {
  if (!req.query.a || !req.query.b){
    return res.status(400).send('Invalid request');
  }
  res.send(`The sum of ${req.query.a} and ${req.query.b} is ${parseInt(req.query.a) + parseInt(req.query.b)}`);
})

app.listen(8080, () => console.log('Server running'));
