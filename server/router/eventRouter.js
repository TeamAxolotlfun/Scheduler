const express = require('express');
// const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController');
const router = express.Router();
const path = require('path');
const eventController = require('../controllers/eventController');

// router.get('createEvent', express.static(path.resolve(__dirname, '../dist')));

// router.post('createEvent', cookieController.checkCookie, eventController.createEvent, (req, res)=>{
//     return sendStatus(200);
// })
router.get('/create-new-event', express.static(path.resolve(__dirname, '../dist')));

router.post('/create-new-event', eventController.createEvent, (req, res) => {
  return res.sendStatus(200);
})

router.get('/getAllUsernames', eventController.getAllUsernames, (req, res) => {
  return res.sendStatus(200).json(usernames);
} )

router.get('/user-invited-events', eventController.getEventsForUser, (req, res) => {
    const events = res.locals.events;
    return res.json(events);
  });

module.exports = router;