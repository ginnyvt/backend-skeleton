const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const userRoute = require('./routes/user.routes');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 5000;

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

// if (process.env.NODE_DEV === 'development') {
//   app.use(
//     cors({
//       origin: `${process.env.CLIENT_URL}`,
//     })
//   );
// }
app.use(cors());

// routes
app.use('/api/users', userRoute);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connected');
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log('server is running');
});
