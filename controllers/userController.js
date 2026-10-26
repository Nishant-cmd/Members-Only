const bcrypt = require('bcryptjs');
const { validationResult, matchedData } = require('express-validator');
const db = require('../model/queries');

const createUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render('partials/errors', { errors: errors.array() });
    }

    const { first_name, last_name, email, password } = matchedData(req);
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.createUser(first_name, last_name, email, hashedPassword);

    return res.redirect('/');
  } catch (err) {
    next(err);
  }
};

const createMessage = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('partials/errors', { errors: errors.array() });
    }

    const { title, message } = matchedData(req);
    const userId = req.user.id;

    await db.createMessage(userId, title, message);

    res.redirect('/message');
  } catch (err) {
    next(err);
  }
};

module.exports = { createUser, createMessage };
