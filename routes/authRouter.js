const { Router } = require('express');
const { validateUser, validateMessage } = require('../controllers/validation');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const requireAuth = require('../middleware/requireAuth');

const router = Router();

//Public route
router.get('/', authController.getLogin);
router.get('/register', authController.getRegsiter);
router.post('/register', validateUser, userController.createUser);

//Authenticate submitted credentials
router.post('/login', authController.postLogin);

//Protected route
router.get('/message', requireAuth, authController.getMessage);
router.get('/new-message', requireAuth, authController.getNewMessage);
router.post('/new-message', requireAuth, validateMessage, userController.createMessage);
router.use('/logout', requireAuth, authController.logOut);

module.exports = router;
