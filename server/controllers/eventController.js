const db = require('../models/model');

const eventController = {};

// const times = [{start: new Date('August 20, 2023 06:30:00'), end: new Date('August 22, 2023 18:30:00')}, {start: new Date('August 23, 2023 06:30:00'), end: new Date('August 25, 2023 18:30:00')}];
// // 2012-06-22 05:40:06
// console.log(times);
eventController.createEvent = async (req, res, next) => {
  try {
    console.log('you are in middleware');
    const { usernames, locations, event_name, details, times } = req.body;
    console.log('hi', req.body.usernames, '  ', req.body.times);
    const userIDs = [];
    console.log(req.body.usernames[0]);
    //getting all the userID associate with the username in the user table
    const createEventQuery = `SELECT * FROM "user" WHERE username = $1;`;
    for (let i = 0; i < usernames.length; i++) {
      console.log(usernames[i]);
      let userID = await db.query(createEventQuery, [usernames[i]]);
      console.log('useridss');
      userIDs.push(userID.rows[0]);
    }
    console.log(userIDs, 'useridss');
    //insert to events table with cookieID username, and event location
    const insertEventQuery = `
                              INSERT INTO "events" (organizer_id, location, event_name, details) 
                              VALUES($1, $2, $3, $4) 
                              RETURNING *;
                              `;
    console.log(req.cookies.userId);
    const eventValue = [req.cookies.userId, locations, event_name, details];
    const createEvents = await db.query(insertEventQuery, eventValue);
    console.log('successful exc');
    //get the event ID from event table?
    const eventID = createEvents.rows[0].event_id;

    //insert userID with the same event ID to the invitation table
    const insertInvitation = `INSERT INTO "invitation" ("user", "event") VALUES($1, $2) RETURNING *;`;
    let invitationValues = [];
    for (let i = 0; i < userIDs.length; i++) {
      invitationValues = [userIDs[i].user_id, eventID];
      console.log(invitationValues);
      const createInvitation = await db.query(
        insertInvitation,
        invitationValues
      );
    }
    const eventOrgAvailability = `INSERT INTO "user_availability" ("user", "event", "available_start_time", "available_end_time") 
                                  VALUES($1,$2,$3,$4)
                                  RETURNING * ;`;
    let eventOrgValues = [];
    let startTime = '';
    let endTime = '';
    console.log(times);
    // const testinggtimes = [
    //   { start: '2023-08-20T06:30:00.000Z', end: '2023-08-22T18:30:00.000Z' },
    //   { start: '2023-08-23T06:30:00.000Z', end: '2023-08-25T18:30:00.000Z' },
    // ];
    // console.log(
    //   'testinggg',
    //   testinggtimes[0].start.slice(0, 19).replace('T', ' ')
    // );
    for (let x = 0; x < times.length; x++) {
      console.log(times[x].start);
      console.log(times[x].end);
      // let startTime = times[x].start.toLocaleString('en-US', { timeZone: 'UTC', hour12: false });
      // console.log(startTime);
      startTime = times[x].start.slice(0, 19).replace('T', ' ');
      endTime = times[x].end.slice(0, 19).replace('T', ' ');
      console.log(startTime, endTime);
      eventOrgValues = [
        req.cookies.userId,
        eventID,
        times[x].start,
        times[x].end,
      ];
      const addEventOrgAvailability = await db.query(
        eventOrgAvailability,
        eventOrgValues
      );
    }
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
    console.log(usernamesResult.rows);
    const usernames = usernamesResult.rows.map((row) => row.username);
    console.log(usernames);
    res.locals.usernames = usernames;
    next();
  } catch (err) {
    return next(err);
  }
};

eventController.getEventsForUser = async (req, res, next) => {
  try {
    // find who is the user from the cookie
    const userId = req.cookies.userId;
    const getInvitedEventsQuery = `
      SELECT * FROM "events"
      INNER JOIN invitation ON events.event_id = invitation.event
      WHERE invitation.user = $1;
    `;
    const events = await db.query(getInvitedEventsQuery, [userId]);
    // console.log(events.fields);
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
      SELECT * FROM "events"
      WHERE organizer_id = $1;
    `;
    const events = await db.query(getEventsQuery, [userId]);
    res.locals.eventsFromOrganizer = events.rows;
    next();
  } catch (err) {
    return next(err);
  }
};

eventController.getTimesForEvent = async (req, res, next) => {
  try {
    //needs to be req.query.event
    console.log(req.query, req.query.event);
    const event_id  = req.query.event;
    const getOrganizer = 'SELECT * from "events" WHERE "event_id" = $1;';
    const gettingOrganizerId = await db.query(getOrganizer, [event_id]);
    console.log(gettingOrganizerId.rows);
    const organizer_id = gettingOrganizerId.rows[0].organizer_id;
    console.log('org_id ', organizer_id, ' event_id', event_id);
    const getTimes =
      `SELECT * from "user_availability" WHERE "user" = $1 AND "event" = $2;`;
    const gettingTimes = await db.query(getTimes, [organizer_id, event_id]);
    console.log(gettingTimes);
    const result = [];
    for (let ele of gettingTimes.rows) {
      result.push({
        start: ele.available_start_time,
        end: ele.available_end_time,
      });
    }
    res.locals.times = result;
    console.log(res.locals.times);
    return next();
  } catch (err) {
    return next(err);
  }
};

//let user select the time from the event time
//insert table userid, event id, times available, be able to select more times
//post request
eventController.inviteeChooseEventTime = async (req, res, next) => {
  // const testinggtimes = [
  //   { start: '2023-08-20T06:30:00.000Z', end: '2023-08-22T18:30:00.000Z' },
  //   { start: '2023-08-23T06:30:00.000Z', end: '2023-08-25T18:30:00.000Z' },
  // ];
  //user id will be in the cookies, insert into user_availability table
  try {
    //const choosingTimes = [];
    const { event_id, times } = req.body;
    const chooseTimes =
      `INSERT INTO "user_availability" ("user", "event", "available_start_time", "available_end_time") VALUES($1, $2, $3, $4) RETURNING *;`;
    const userId = req.cookies.userId;
    for (let i = 0; i < times.length; i++) {
      //times[i].start
      //choosingTimes.push =
      await db.query(chooseTimes, [
        userId,
        event_id,
        times[i].start,
        times[i].end,
      ]);
    }

    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = eventController;
