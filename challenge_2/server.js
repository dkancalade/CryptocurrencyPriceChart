const express = require('express');
const path = require('path');

const app = express();

const port = process.env.PORT || 4400;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.resolve(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendStatus(200).end();
});

app.listen(port, () => {
  console.log(`App is listening on ${port} `);
})
