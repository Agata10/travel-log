const epxress = require('express');
const app = epxress();

app.get('/', (req, res) => {
  res.json({ success: 'YAY' });
});

app.listen(3000, () => {
  console.log('Server listening on port: ', '3000');
});
