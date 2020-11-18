const request = require('supertest');
const app = require('../lib/app');
require('../lib/data/data-helper');

describe('Prompt model test', () => {
  it('should get all the prompts from the database using via GET', async() => {
    await request(app)
      .get('/api/v1/prompts')
      .then(res => {
        expect(res.body.length).toEqual(40);
      });
  });
});
