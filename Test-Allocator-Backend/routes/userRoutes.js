const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.register);

router.post('/login', userController.login);

const auth = require('../middleware/auth');

router.get('/verifyuser', auth, userController.verifyuser);

module.exports = router;
