const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const userRoute = require('./routes/user.routes');
const authRoute = require('./routes/auth.routes');

const PORT = process.env.PORT || 5000;

const app = express();

// middlewares
// app.use(morgan('dev'));
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
app.use('/auth', authRoute);

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

// Catch unauthorised errors
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: err.name + ': ' + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ': ' + err.message });
    console.log(err);
  }
});

app.listen(PORT, () => {
  console.log('server is running');
});
