const path = require('node:path');
const { loadEnvFile } = require('node:process');
loadEnvFile(path.join(__dirname, '../.env'));
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

const getJoinClub=(req,res)=>{
  res.render('messages/joinClub')
}

const validateJoinClub = (req, res) => {
  const  passcode  = req.body.passcode;
  const userId=req.user.id;
  if (passcode !== process.env.CLUB_PASSCODE) {
    return res.status(400).render('partials/errors', { errors: [{ msg: 'Invalid passcode' }] });
  }
  db.updateUserStatus(userId, 'ACTIVE');
  res.redirect('/message');
};

const getAdminAccess=(req,res)=>{
  res.render('messages/admin')
}
const validateAdminAccess = (req, res) => {
  const  passcode  = req.body.adminPasscode;
  const userId=req.user.id;
  if (passcode !== process.env.ADMIN_PASSCODE) {
    return res.status(400).render('partials/errors', { errors: [{ msg: 'Invalid passcode' }] });
  }
  db.updateAdminStatus(userId, true);
  res.redirect('/message');
};

const deleteMessage=(req,res)=>{
  const messageId=req.params.id;
  db.deleteMessage(messageId);
  res.redirect('/message');
}

module.exports = { createUser, createMessage,getJoinClub, validateJoinClub, deleteMessage,getAdminAccess,validateAdminAccess };
