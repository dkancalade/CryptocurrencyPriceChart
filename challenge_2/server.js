const express = require('express');
const path = require('path');
const cors = require('cors');
const axios = require('axios');

const app = express();

const port = process.env.PORT || 4400;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(cors());

app.get('/historicalData', (req, res) => {
  const start = req.query.start;
  const end = req.query.end;
  const curr = req.query.curr;
  const url = `https://api.coindesk.com/v1/bpi/historical/close/${curr}.json/?start=${start}&end=${end}`;
  axios.get(url)
    .then((data) => {
      res.send(data.data.bpi).status(201).end();
  }).catch((err) => {
    console.log('err', err);
  });
});


app.listen(port, () => {
  console.log(`App is listening on ${port} `);
});
