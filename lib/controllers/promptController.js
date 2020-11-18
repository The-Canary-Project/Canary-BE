const { Router } = require('express');
const Prompt = require('../model/Prompt');

module.exports = Router()
  .get('/', (req, res, next) => {
    Prompt
      .getAllPrompts(req.body)
      .then(words => res.send(words))
      .catch(next);
  });
