const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 5000;

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

// routes
app.get('/', (req, res) => {
  res.json({
    time: Date().toString(),
  });
});

app.listen(PORT, () => {
  console.log('server is running');
});
