require('dotenv').config();

//setup the express app
const epxress = require('express');
const app = epxress();
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.json({ success: 'YAY' });
});

app.listen(PORT, () => {
  console.log('Server listening on port:', PORT);
});
