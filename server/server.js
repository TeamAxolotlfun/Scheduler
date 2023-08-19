const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const PORT = 3000;
const controller = require('./controllers/userController');
const userRouter = require('./router/userRouter');
const eventRouter = require('./router/eventRouter');

app.use(cookieParser());
/**
* Automatically parse urlencoded body content and form data from incoming requests and place it
* in req.body
*/
app.use(express.json());
app.use(express.urlencoded());

app.use('/', express.static(path.resolve(__dirname, '../dist'))); //dist has all the static file

/**
 * define route handlers
 */
app.use('/user', userRouter); 
app.use('/event', eventRouter); 

// catch-all route handler for any requests to an unknown route
app.use((req, res) => res.status(404).send('This is not the page you\'re looking for...'));

/**
 * express error handler
 * @see https://expressjs.com/en/guide/error-handling.html#writing-error-handlers
 */
/**
 * 404 handler
 */
app.use('*', (req,res) => {
    res.status(404).send('Not Found');
  });
/**
 * Global error handler
 */
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send({ error: err });
  });

/**
 * start server
 */
app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}...`);
  });
  
  module.exports = app;