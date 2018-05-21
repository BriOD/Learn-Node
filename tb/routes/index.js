const express = require('express');
const router = express.Router();
const tourneyController = require('../controllers/tourneyController');

// Do work here
router.get('/', tourneyController.myMiddleware, tourneyController.homePage);

module.exports = router;
