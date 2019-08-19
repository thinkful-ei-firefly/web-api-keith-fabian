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

app.get('/lotto', (req, res) => {
  if(!req.query.arr){
    return res.status(400).send('Invalid request');
  }
  let inputs = req.query.arr;
  let match = 0;

  let arr = [1,2,3,4,5,6,7,8,9,10];
  let rand = [];
  let j = 0;

  for (let i = 0; i < 6; i++){
    j = Math.floor(Math.random() * (arr.length));
    rand.push(arr[j]);
    arr.splice(j,1);
  }
  console.log(rand);
  console.log(inputs);

  inputs.forEach(input => {
      if (rand.includes(parseInt(input))){
        match++;
      }
    }
  )

  console.log(match);

  if (match < 4){
    res.send("Sorry, you lose");
  }else if(match == 4){
    res.send("Congratulations, you win a free ticket");
  }else if(match == 4){
    res.send("Congratulations! You win $100!");
  }else{
    res.send("Wow! Unbelievable! You could have won the mega millions!");
  }

});

app.listen(8080, () => console.log('Server running'));
