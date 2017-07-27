const express = require('express');
const router = express.Router();
const passport = require('passport');
const controllers = require('.././controllers');
const AuthMiddleware = require('.././middleware/auth');

router.get('/', controllers.HomeController.index);
router.get('/auth/signup', controllers.UserController.getSignUp);
router.post('/auth/signup', controllers.UserController.postSignUp);
router.get('/auth/signin', controllers.UserController.getSignIn);
router.post('/auth/signin', passport.authenticate('local', {
  successRedirect : '/users/panel',
  failureRedirect : '/auth/signin',
  failureFlash : true
}));
router.get('/auth/logout', controllers.UserController.logout);
router.get('/users/panel', AuthMiddleware.isLogged, controllers.UserController.getUserPanel);

module.exports = router;
