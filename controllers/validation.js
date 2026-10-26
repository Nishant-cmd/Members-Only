const { body } = require('express-validator');
`;`;
const validateUser = [
  body('first_name')
    .trim()
    .isAlpha()
    .withMessage('First name must contain only letters')
    .notEmpty()
    .withMessage('First name is required')
    .isLength({ min: 1, max: 10 })
    .withMessage('First name must be between 1 and 10 characters long'),
  body('last_name')
    .trim()
    .isAlpha()
    .withMessage('Last name must contain only letters')
    .notEmpty()
    .withMessage('Last name is required')
    .isLength({ min: 1, max: 10 })
    .withMessage('Last name must be between 1 and 10 characters long'),
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .notEmpty()
    .withMessage('Email is required')
    .normalizeEmail(),
  body('password')
    .trim()
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .notEmpty()
    .withMessage('Password is required')
    .matches('[0-9]')
    .withMessage('Password must contain at least one number')
    .matches('[A-Z]')
    .withMessage('Password must contain at least one uppercase letter'),
];

const validateMessage = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 1, max: 50 })
    .withMessage('Title must be between 1 and 50 characters long'),
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 1, max: 1000 })
    .withMessage('Message must be between 1 and 1000 characters long'),
];

module.exports = { validateUser, validateMessage };
