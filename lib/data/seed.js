const Prompt = require('../model/Prompt');
const promptsArray = require('./prompts');

module.exports = async() => {
  await Promise.all(promptsArray.map(prompt => Prompt.insert(prompt)));
};
