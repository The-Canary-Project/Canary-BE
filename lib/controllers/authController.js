const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const UserService = require('../services/user-service');

module.exports = Router()
  .post('/signup', (req, res, next) => {
    UserService
      .signup(req.body)
      .then(user => {
        UserService.setSessionCookie(res, user);
        res.send(user);
      })
      .catch(next);
  })

  .post('/login', (req, res, next) => {
    UserService
      .authorize(req.body)
      .then(user => {
        UserService.setSessionCookie(res, user);
        res.send(user);
      })
      .catch(next);
  })

  .get('/verify', ensureAuth, (req, res) => {
    res.send(req.user);
  });
