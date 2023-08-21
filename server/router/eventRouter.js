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
//router.get('/create-new-event', express.static(path.resolve(__dirname, '../dist'), {fallthrough: false, redirect: false}));
//router.get('/select-times', express.static(path.resolve(__dirname, '../dist'), {fallthrough: false, redirect: false}));
router.use('/create-new-event', express.static(path.resolve(__dirname, '../../dist')));
router.use('/select-times', express.static(path.resolve(__dirname, '../../dist')));

router.post('/create-new-event', eventController.createEvent, (req, res) => {
  return res.sendStatus(200);
})

router.get('/getAllUsernames', eventController.getAllUsernames, (req, res) => {
  return res.status(200).json(res.locals.usernames);
} )

router.get('/user-invited-events', eventController.getEventsForUser, (req, res) => {
    return res.status(200).json(res.locals.events);
  });

router.get('/organizer-invited-events', eventController.getEventsForOrganizer, (req, res) => {
    return res.status(200).json(res.locals.eventsFromOrganizer);
  });

router.get('/gettingInvitationTimes' , eventController.getTimesForEvent, (req, res)=>{
  return res.status(200).json(res.locals.times);
});

router.post('/inviteeChooseEventTime', eventController.inviteeChooseEventTime, (req, res) => {
  return res.sendStatus(200);
})

module.exports = router;