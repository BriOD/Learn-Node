const express = require('express');
const router = express.Router();
const tourneyController = require('../controllers/tourneyController');

// Do work here
router.get('/', tourneyController.homePage);

module.exports = router;
