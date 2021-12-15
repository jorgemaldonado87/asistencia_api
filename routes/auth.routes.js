//import express
//import routes
const express = require('express');
const router = express.Router();

//import auth controller
const authController = require('../controllers/auth.controller');

//login route
router.get('/login', authController.login);

//export router
module.exports = router;