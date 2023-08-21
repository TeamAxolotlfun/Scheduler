const db = require('../models/model');

const eventController = {};

const times = [{start: new Date('August 20, 2023 06:30:00'), end: new Date('August 22, 2023 18:30:00')}, {start: new Date('August 23, 2023 06:30:00'), end: new Date('August 25, 2023 18:30:00')}];
// 2012-06-22 05:40:06
console.log(times);
eventController.createEvent = async (req, res, next) => {
  try {
    const { usernames, locations, event_name, details, times } = req.body;
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
      'INSERT INTO "events" (organizer_id, location, event_name, details) VALUES($1, $2, $3, $4) RETURNING *';
    const eventValue = [req.cookies.userId, locations, event_name, details];
    const createEvents = await db.query(insertEventQuery, eventValue);
    //get the event ID from event table?
    const eventID = createEvents.rows[0].event_id;

    //insert userID with the same event ID to the invitation table
    const insertInvitation = 'INSERT INTO "invitation" (user, event) VALUES($1, $2)';
    let invitationValues = [];
    for(let i = 0; i < userIDs.length; i ++){
      invitationValues = [userIDs[i], eventID];
      const createInvitation = await db.query(insertInvitation, invitationValues);
    }
    const eventOrgAvailability = 'INSERT INTO "user_availability" (user, event, available_start_time, available_end_time) VALUES($1,$2,$3,$4)'
    let eventOrgValues = [];

    for(let x = 0; x < times.length; x++){
      let startTime = times[x].start.toISOString().slice(0, 19).replace('T', ' ')
      let endTime = times[x].end.toISOString().slice(0, 19).replace('T', ' ')
      eventOrgValues = [req.cookies.userId, eventID, startTime, endTime];
      const addEventOrgAvailability = await db.query(eventOrgAvailability, eventOrgValues);
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
// eventController.getEvent = async (req, res, next) => {
//   try {
//   } catch (err) {
//     return next(err);
//   }
// };

eventController.getAllUsernames = async (req, res, next) => {
  try {
    const getAllUsernamesQuery = 'SELECT username FROM "user"';
    const usernamesResult = await db.query(getAllUsernamesQuery);
    const usernames = usernamesResult.rows.map(row => {
      if(req.cookies.userId != row.username) row.username
    });
    res.locals.usernames = usernames;
    next(); 
  } catch (err) {
    return next(err);
  }
}


eventController.getEventsForUser = async (req, res, next) => {
  try {
    // find who is the user from the cookie
    const userId = req.cookies.userId;
    const getInvitedEventsQuery = `
      SELECT events.*
      FROM events
      INNER JOIN invitation ON events.event_id = invitation.event
      WHERE invitation.user = $1;
    `;
    const events = await db.query(getInvitedEventsQuery, [userId]);

    res.locals.events = events.rows;
    next();
  } catch (err) {
    return next(err);
  }
};

eventController.getEventsForOrganizer = async (req, res, next) => {
  try {
    // find who is the user from the cookie
    const userId = req.cookies.userId;
    const getEventsQuery = `
      SELECT *
      FROM events
      WHERE organizer_id = $1;
    `;
    const events = await db.query(getEventsQuery, [userId]);
    res.locals.eventsFromOrganizer = events.rows;
    next();
  } catch (err) {
    return next(err);
  }
};

eventController.createEvent = (req, res, next) => {};

module.exports = eventController;
