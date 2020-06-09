const express = require('express');
const path = require('path');

const app = express();

const port = 8200;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));


// app.get('/', (req, res) => {
//   res.send('Hi!');
// });


app.listen(port, () => {
  console.log(`app is listening on port: ${port}`);
})

