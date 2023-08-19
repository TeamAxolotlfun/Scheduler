const express = require('express');

const userController = require('../controllers/userController');

const router = express.Router();

/**
* --- Express Routes ---
* Express will attempt to match these routes in the order they are declared here.
* If a route handler / middleware handles a request and sends a response without
* calling `next()`, then none of the route handlers after that route will run!
* This can be very useful for adding authorization to certain routes...
*/

/**
* root
*/
app.get('/', cookieController.setCookie, (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/index.html')); //!change the index.html?
  });
  
  
  /**
  * signup
  */
  app.get('/signup', express.static(path.resolve(__dirname, '../dist'))); //react router don't need each html page, send everything in the dist folder
  
  //no session cookie, stretch feature
  app.post('/signup', userController.createUser, cookieController.setUserCookie, (req, res) => {
    // what should happen here on successful sign up?
    //send back 200 or 400 code
  });

  /**
* login
*/
app.get('/login', express.static(path.resolve(__dirname, '../dist'))); //redirect to the login page
app.post('/login', userController.verifyUser, cookieController.setUserCookie, (req, res) => {
    // what should happen here on successful log in?
    //req.session.existingUser = req.existingUser; //hodding a session into the middleware
    //res.redirect('/secret');
  });

//get request from login, verify through controller, 
//if successful, status code, res.redirect(''); redirect to another page
// if not successful, pop up a error message, let the user click the sign up page themselves

// router.get('/', userController., 
// (req, res)=>res.status(200).json({}));

//post requst for sign up, in the controller, create the user info in the database
//successful status code, redirect to the authorize route

