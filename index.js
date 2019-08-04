const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const nedb = require('nedb');
const fetch = require('node-fetch');
require('dotenv').config();

// console.log(process.env);

app.listen(port, () => console.log('app listening'));
app.use(express.static('public'));
app.use(express.json({
  limit: "1mb"
}))

// array to save location
let database = new nedb('database.db');
database.loadDatabase(err => {
  // callback
});

// Get method route
app.get('/api', (req, res) => {
  database.find({}, (err, data) => {
    if (err) {
      console.log('err finding db!');
      res.end();
      return;
    }
    res.json(data);
  });
});

// POST method route
app.post('/api', (req, res) => {
  console.log('got new request!');
  const data = req.body;
  const timestamp = Date.now();
  data.timestamp = timestamp; // add timestamp to variable data
  database.insert(data);
  res.json(data);
});

app.get('/weather/:latlng', async (req, res) => {
  const latlng = req.params.latlng;
  const darksky_key = process.env.DARK_KEY;
  let dark_api = `https://api.darksky.net/forecast/${darksky_key}/${latlng}?units=si`;
  let dark_res = await fetch(dark_api);
  let darksky_data = await dark_res.json();

  let aq_api = `https://api.openaq.org/v1/latest?coordinates=${latlng}`;
  let aq_res = await fetch(aq_api);
  let aq_data = await aq_res.json();

  const response = {
    darksky: darksky_data,
    aq: aq_data
  };

  res.json(response);
});