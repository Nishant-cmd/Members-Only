const passport = require("../config/passport");
const { getAllMessages, getUserMessage } = require("../model/queries");

const getLogin = function (req, res) {
  const errors = req.session.messages || [];
  req.session.messages = [];
  res.render("auth/login", { errors });
};

const postLogin = passport.authenticate("local", {
  successRedirect: "/message",
  failureRedirect: "/",
  failureMessage: true,
});

const getRegsiter = (req, res) => {
  res.render("auth/register");
};

const getMessage = async (req, res) => {
  const messages = await getAllMessages();
  res.render("messages/message", {
    title: "All Messages",
    userId: req.user.id,
    messages,
  });
};

const getMyMessage = async (req, res) => {
  const messages = await getUserMessage(req.user.id);
  res.render("messages/message", {
    title: "My Messages",
    userId: req.user.id,
    messages,
  });
};

const getNewMessage = (req, res) => {
  res.render("messages/createMessage");
};
const logOut = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

module.exports = {
  getLogin,
  postLogin,
  getRegsiter,
  getMessage,
  getNewMessage,
  logOut,
  getMyMessage,
};
