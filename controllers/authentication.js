const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

//function to create a token to give to the signed up user.
//uses the package jwt-simple
function tokenForUser(user) {
  const timeStamp = new Date().getTime()
  return jwt.encode({sub: user.id, iat: timeStamp }, config.secret);
}

exports.signin = function(req, res, next) {
  //to get here, passport has already auth'ed the email and password.
  res.send({token: tokenForUser(req.user)});
}

//exporting a method called signup
exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  //ensuring that you MUST post and email & password
  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide an email and password' })
  }

  User.findOne({ email: email }, (err, user) => {
    if (err) return  next(err);
    if (user) {
      return res.status(422).send({ error: 'email already in use'});
    }
    const newUser = new User({
      email: email,
      password: password
    });
    //saves the newuser to mongo and sends a token
    newUser.save((err) => {
      if(err) return next(err);
      res.send({ token: tokenForUser(newUser) });
    });
  });
}