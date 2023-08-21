const express = require('express');
const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController');
const router = express.Router();
const path = require('path');

/**
 * --- Express Routes ---
 * Express will attempt to match these routes in the order they are declared here.
 * If a route handler / middleware handles a request and sends a response without
 * calling `next()`, then none of the route handlers after that route will run!
 * This can be very useful for adding authorization to certain routes...
 */

/**
 * signup
 */
router.use('/signup', express.static(path.resolve(__dirname, '../../dist'))); //react router don't need each html page, send everything in the dist folder

//no session cookie, stretch feature
// create an account, redirect user to login page when successful
router.post('/signup', userController.createUser, (req, res) => {
  // what should happen here on successful sign up?
  return res.sendStatus(200);
});

/**
 * login
 */
router.use('/login', express.static(path.resolve(__dirname, '../../dist'))); //using the react router, redirect to the login page

router.post(
  '/login',
  userController.verifyUser,
  cookieController.setCookie,
  (req, res) => {
    return res.sendStatus(200);
  });


module.exports = router;