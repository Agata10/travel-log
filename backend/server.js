require('dotenv').config();

//setup the express app
const epxress = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = epxress();
const PORT = process.env.PORT || 8080;

//connect to database
const configDB = require('./conn');
configDB();

//allow cors
app.use(cors());
//logger
app.use(morgan('dev'));
//allow access to body sent in the request
app.use(epxress.json());

app.get('/', (req, res, next) => {
  res.json({ msg: 'YAY' }).status(200);
});

//error handling
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const msg = err.message;
  res.status(status);
  res.json({ error: msg, status: status });
});

app.listen(PORT, () => {
  console.log('Server listening on port:', PORT);
});
