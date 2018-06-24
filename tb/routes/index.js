const express = require('express');
const router = express.Router();
const tourneyController = require('../controllers/tourneyController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', catchErrors(tourneyController.getTourneys));
router.get('/tourneys', catchErrors(tourneyController.getTourneys));
router.get('/add',  authController.isLoggedIn, tourneyController.addTourney);

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

router.get('/login', userController.loginForm);
router.post('/login', authController.login);
router.get('/register', userController.registerForm);
// 1. validate registration data
// 2. register the user
// 3. log them in
router.post('/register', 
    userController.validateRegister,
    userController.register,
    authController.login
);

router.get('/logout', authController.logout);

router.get('/account', authController.isLoggedIn, userController.account);
router.post('/account', catchErrors(userController.updateAccount));
router.post('/account/forgot', catchErrors(authController.forgotPassowrd));
router.get('/account/reset/:token', catchErrors(authController.reset));
router.post('/account/reset/:token', 
    authController.confirmedPasswords, 
    catchErrors(authController.update)
);


module.exports = router;
