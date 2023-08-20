const db = require('../models/model');
const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');

const userController = {};

userController.createUser = async (req, res, next) => {
  try {
    const existingUserQuery = `SELECT * FROM "user" WHERE username = $1`;
    const existingUserValues = [req.body.username];
    // Check if the username already exists
    const existingUserResult = await db.query(
      existingUserQuery,
      existingUserValues
    );
    if (existingUserResult.rows.length > 0) {
      return res.status(400).json({ error: 'Username already exists' });
    }
    const hashingPassword = await bcrypt.hash(
      req.body.password,
      SALT_WORK_FACTOR
    );
    //INSERT INTO "user" (username, password) VALUES ('user1', 'pw');
    const insertQuery = `INSERT INTO "user" (username, password) VALUES($1, $2) RETURNING *`;
    const insertValues = [req.body.username, hashingPassword];
    // Execute the SQL query to insert the user
    const createUser = await db.query(insertQuery, insertValues);
    console.log(createUser.rows);
    res.locals.userId = createUser.rows[0].user_id;
    console.log('Successful saved userID', res.locals.userId);
    // Send a successful response
    // res.status(201).json({ message: 'User created successfully' });
    return next();
  } catch (err) {
    return next(err);
  }
};

userController.verifyUser = async (req, res, next) => {
  try {
    //Deconstruct username and password from body
    const { username, password } = req.body;
    const checkingUserExists = `SELECT * FROM "user" WHERE username = $1`;
    const values = [username];
    const userInfo = await db.query(checkingUserExists, values)
    console.log(userInfo.rows)
    if (userInfo.rows.length === 0) {
        // return not found user
        // return res.status(400).json({ message: 'User not found' });
        return next({
            log: 'Middleware verifyUser receiving data error',
            status : 406,
            message: {err: 'User not found' },
        });
    }
    // check if password is matched
    const checkingHashedPassword = await bcrypt.compare(password, userInfo.rows[0].password);
    if (!checkingHashedPassword) {
        //return hashedpassword is not matched
        return next({
            log: 'Middleware verifyUser password does not error',
            status : 401,
            message: {err: 'Password is not correct' },
        });
    }
    res.locals.userInfo = userInfo.rows[0];
    res.locals.userId = userInfo.rows[0].user_id;
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = userController;
