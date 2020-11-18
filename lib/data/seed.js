const Prompt = require('../model/Prompt');
const promptsArray = require('./prompts');
const fs = require('fs');
const pool = require('../utils/pool');

module.exports = async() => {
  await pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  await Promise.all(promptsArray.map(prompt => Prompt.insert(prompt)));
};
