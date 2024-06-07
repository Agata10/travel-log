require('dotenv').config();

//setup the express app
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const PORT = process.env.PORT || 8080;

//connect to database
const configDB = require('./conn');
configDB();

const requireAuth = require('./middleware/authMiddleware');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const tripRoutes = require('./routes/tripRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const placeRoutes = require('./routes/placeRoutes');

//allow cors
app.use(cors());
//logger
app.use(morgan('dev'));
//allow access to body sent in the request
app.use(express.json());

app.get('/', (req, res, next) => {
  res.json({ msg: 'Connected to the API' }).status(200);
});

app.use('/api/users', requireAuth, userRoutes);
app.use('/api/trips', requireAuth, tripRoutes);
app.use('/api/expenses', requireAuth, expenseRoutes);
app.use('/api/places', requireAuth, placeRoutes);
app.use(authRoutes);
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
