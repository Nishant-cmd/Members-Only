const passport = require('../config/passport');

const getLogin = function (req, res) {
  const errors = req.session.messages || [];
  req.session.messages = [];
  res.render('auth/login', { errors });
};

const postLogin = passport.authenticate('local', {
  successRedirect: '/message',
  failureRedirect: '/',
  failureMessage: true,
});

const getRegsiter = (req, res) => {
  res.render('auth/register');
};

const getMessage = (req, res) => {
  res.render('messages/message');
};

const getNewMessage = (req, res) => {
  res.render('messages/createMessage');
};

const logOut = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};

module.exports = { getLogin, postLogin, getRegsiter, getMessage, getNewMessage, logOut };
