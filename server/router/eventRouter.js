const express = require('express');
// const userController = require('../controllers/eventController');
const cookieController = require('../controllers/cookieController');
const router = express.Router();
const path = require('path');

// router.get('createEvent', express.static(path.resolve(__dirname, '../dist')));

// router.post('createEvent', cookieController.checkCookie, eventController.createEvent, (req, res)=>{
//     return sendStatus(200);
// })



module.exports = router;