const express = require('express');
const router = express.Router();
const tourneyController = require('../controllers/tourneyController');

const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', tourneyController.homePage);
router.get('/add', tourneyController.addTourney);
router.post('/add', catchErrors(tourneyController.createTourney));

module.exports = router;
