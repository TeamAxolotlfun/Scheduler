const express = require('express');
const path = require('path');
const app = express();

app.use('/user/login', express.static(path.resolve(__dirname, '../dist')));
app.use('/user/signup', express.static(path.resolve(__dirname, '../dist')));

app.listen(3000, () => {
    console.log(`Server listening on port: 3000...`);
  });
  
module.exports = app;