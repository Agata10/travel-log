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

const userRoutes = require('./routes/userRoutes');
const tripRoutes = require('./routes/tripRoutes');
const expenseRoutes = require('./routes/expenseRoutes');

//allow cors
app.use(cors());
//logger
app.use(morgan('dev'));
//allow access to body sent in the request
app.use(epxress.json());

app.get('/', (req, res, next) => {
  res.json({ msg: 'Connected to the API' }).status(200);
});

app.use('/api/users', userRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/expense', expenseRoutes);

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
