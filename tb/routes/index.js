const express = require('express');
const router = express.Router();
const tourneyController = require('../controllers/tourneyController');

// Do work here
router.get('/', tourneyController.homePage);
router.get('/add', tourneyController.addTourney);
router.post('/add', tourneyController.createTourney);

module.exports = router;
