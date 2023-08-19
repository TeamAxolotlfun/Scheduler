const cookieController = {};

cookieController.setCookie = (req, res, next) => {
  console.log('res.locals.userid: ', res.locals.userId)
    //setting the cookie = userID, passed in through saving in res.locals.userID in previous middleware
    res.cookie('userid', res.locals.userId , {});
    return next();
  }
  // cookieController.checkCookie = (req, res, next) => {
  //   //setting the cookie = userID, passed in through saving in res.locals.userID in previous middleware
  //   res.cookie('username', req.body.username, {});
  //   return next();
  // }
//req.
  module.exports = cookieController;