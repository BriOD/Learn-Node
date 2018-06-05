const express = require('express');
const router = express.Router();
const tourneyController = require('../controllers/tourneyController');
const userController = require('../controllers/userController');

const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', catchErrors(tourneyController.getTourneys));
router.get('/tourneys', catchErrors(tourneyController.getTourneys));
router.get('/add', tourneyController.addTourney);

router.post('/add', 
    tourneyController.upload,
    catchErrors(tourneyController.resize),
    catchErrors(tourneyController.createTourney)
);

router.post('/add/:id', 
    tourneyController.upload,
    catchErrors(tourneyController.resize),
    catchErrors(tourneyController.createTourney)
);

router.get('/tourneys/:id/edit', catchErrors(tourneyController.editTourney));
router.get('/tourneys/:id', catchErrors(tourneyController.getTourneyById));

router.get('/login', userController.loginForm)
router.get('/register', userController.registerForm)
// 1. validate registration data
// 2. register the user
// 3. log them in
router.post('/register', userController.)

module.exports = router;
