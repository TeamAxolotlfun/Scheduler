const db = require('../models/model');

const eventController = {};

// const times = [{start: new Date('August 20, 2023 06:30:00'), end: new Date('August 22, 2023 18:30:00')}, {start: new Date('August 23, 2023 06:30:00'), end: new Date('August 25, 2023 18:30:00')}];
eventController.createEvent = async (req, res, next) => {
  try {
    const { usernames, locations, eventDetails, times } = req.body;
    const userIDs = [];
    let userID = '';
    //getting all the userID associate with the username in the user table
    const createEventQuery = 'SELECT * FROM "user" WHERE username = $1';
    for (let i = 0; i < usernames.length; i++) {
      userID = await db.query(createEventQuery, usernames[i]);
      userIDs.push(userID);
    }
    //insert to events table with cookieID username, and event location
    const insertEventQuery =
      'INSERT INTO "events" (organizer_id, locations) VALUES($1, $2) RETURNING *';
    const eventValue = [req.cookies, locations];
    const createEvent = await db.query(insertEventQuery, eventValue);
//get the event ID from event table?
const eventID = createEvent.rows[0];

    //insert userID with the same event ID to the invitation table
const insertInvitation = 'INSERT INTO "invitation" (user, event) VALUES($1, $2)';
let invitationValues = '';
for(let i = 0; i < userIDs.length; i ++){
    invitationValues = [userIDs[i], eventID];
    const createInvitation = await db.query(insertInvitation, invitationValues);
}
    // const createEventQuery = 'SELECT * FROM "user" WHERE username = $1';
    //pass in usernames in an array [], event details in object {},
    //find all the userid associated with the usernames add to invitation table
    // create user_availability table, userid associated with event id from event table
    //create 3 tables, event table, invitation table, and user_availability table
    /**
     * create a event table, orgnizer_id = cookie_value, location in event details, start time, end time
     */
    return next();
  } catch (err) {
    return err;
  }
};
//home page
// After you log in to the platform, you would receive an invitation + need time + dates for that event
eventController.getEvent = (req, res, next) => {
  try {
  } catch (err) {
    return next(err);
  }
};

eventController.getInvitations = (req, res, next) => {
  try {
  } catch (err) {
    return next(err);
  }
};

eventController.createEvent = (req, res, next) => {};

module.exports = eventController;
