const express = require('express');
const app = express();

app.get('/sum', (req, res) => {
  if (!req.query.a || !req.query.b){
    return res.status(400).send('Invalid request');
  }
  res.send(`The sum of ${req.query.a} and ${req.query.b} is ${parseInt(req.query.a) + parseInt(req.query.b)}`);
})

app.get('/cipher', (req, res) => {
  if (!req.query.text || !req.query.shift){
    return res.status(400).send('Invalid request');
  }
  const lower = req.query.text.toLowerCase();
  const arr = lower.split('');
  const coded = arr.map(letter => {
    let x = letter.charCodeAt(0);
    x += parseInt(req.query.shift);
    if (x < 97) {
      let diff = x-97;
      x = 123 + diff;
    } else if (x > 122){
      let diff = 122 - x;
      x = 96 - diff;
    }
    return String.fromCharCode(x);
  });
  res.send(`${coded.join('')}`);
});

app.listen(8080, () => console.log('Server running'));
