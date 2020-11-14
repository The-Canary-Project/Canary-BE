const seed = require('./lib/data/seed');

seed()
  .then(data => console.log(data.length, 'done'));
