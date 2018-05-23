const express = require('express');
const router = express.Router();
const tourneyController = require('../controllers/tourneyController');

const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', catchErrors(tourneyController.getTourneys));
router.get('/tourneys', catchErrors(tourneyController.getTourneys));
router.get('/add', tourneyController.addTourney);
router.post('/add', catchErrors(tourneyController.createTourney));
router.get('/tourneys/:id/edit', catchErrors(tourneyController.editTourney));

module.exports = router;
