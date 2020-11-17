const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
require('../lib/data/data-helper')
const Chance = require('chance')

const chance = new Chance()

describe('Canary-BE users routes', () => {
  it('should insert a user into the DB via POST', async () => {
    const user = {
      userName: chance.word(),
      password: '1234',
      userRole: 'student'
    };

    return request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .then(res => expect(res.body).toEqual({ id: expect.any(String), userName: expect.any(String), userRole: 'student' }));
  });

  // test for same userName signups
  it('should throw an error if a user signs up with an already taken username', async () => {
    const user = {
      userName: chance.word(),
      password: '1234',
      userRole: 'student'
    };

    await request(app)
      .post('/api/v1/auth/signup')
      .send(user);

    return await request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .then(res => expect(res.body.message).toEqual('duplicate key value violates unique constraint \"users_user_name_key\"'));
  });

  it('should login a user via POST', async () => {
    const user = {
      userName: chance.word(),
      password: '1234',
      userRole: 'student'
    };

    await request(app)
      .post('/api/v1/auth/signup')
      .send(user);

    return request(app)
      .post('/api/v1/auth/login')
      .send(user)
      .then(res => expect(res.body).toEqual({ id: expect.any(String), userName: expect.any(String), userRole: 'student' }));
  });
  
  it('should insert a user into the DB via POST', async() => {
    const user = {
      userName: 'benwa',
      password: '1234',
      userRole: 'student'
    };

    return request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .then(res => expect(res.body).toEqual({ id: expect.any(String), userName: 'benwa', userRole: 'student' }));
  });

  // test for same userName signups
  it('should throw an error if a user signs up with an already taken username', async() => {
    const user = {
      userName: 'benwa',
      password: '1234',
      userRole: 'student'
    };

    await request(app)
      .post('/api/v1/auth/signup')
      .send(user);

    return await request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .then(res => expect(res.body.message).toEqual('duplicate key value violates unique constraint \"users_user_name_key\"'));
  });

  it('should login a user via POST', async() => {
    const user = {
      userName: 'benwa',
      password: '1234',
      userRole: 'student'
    };

    await request(app)
      .post('/api/v1/auth/signup')
      .send(user);

    return request(app)
      .post('/api/v1/auth/login')
      .send(user)
      .then(res => expect(res.body).toEqual({ id: expect.any(String), userName: 'benwa', userRole: 'student' }));
  });

  it('should throw an error if a user gives an incorrect password or username', async() => {
    const user = {
      userName: 'benwa',
      password: '1234',
      userRole: 'student'
    };

    await request(app)
      .post('/api/v1/auth/signup')
      .send(user);

    await request(app)
      .post('/api/v1/auth/login')
      .send({
        userName: 'benwa',
        password: '1236'
      })
      .then(res => expect(res.body.message).toEqual('Invalid username/password'));

    await request(app)
      .post('/api/v1/auth/login')
      .send({
        userName: 'benwaaa',
        password: '1234'
      })
      .then(res => expect(res.body.message).toEqual('Invalid username/password'));
  });

  it('test that a signed up user has a jwt', async() => {
    const user = {
      userName: 'benwa',
      password: '1234',
      userRole: 'student'
    };

    const newUser = await request(app)
      .post('/api/v1/auth/signup')
      .send(user);

    return expect(newUser.header['set-cookie'][0]).toEqual(expect.any(String));
  });

  it('test that a logged in user has a jwt', async() => {
    const user = {
      userName: 'benwa',
      password: '1234',
      userRole: 'student'
    };

    await request(app)
      .post('/api/v1/auth/signup')
      .send(user);

    const newUser = await request(app)
      .post('/api/v1/auth/login')
      .send(user);

    return expect(newUser.header['set-cookie'][0]).toEqual(expect.any(String));
  });

  it('should throw an error if a user gives an incorrect password or username', async () => {
    const user = {
      userName: 'benwa',
      password: '1234',
      userRole: 'student'
    };

    await request(app)
      .post('/api/v1/auth/signup')
      .send(user);

    await request(app)
      .post('/api/v1/auth/login')
      .send({
        userName: 'benwa',
        password: '1236'
      })
      .then(res => expect(res.body.message).toEqual('Invalid username/password'));

    await request(app)
      .post('/api/v1/auth/login')
      .send({
        userName: 'benwaaa',
        password: '1234'
      })
      .then(res => expect(res.body.message).toEqual('Invalid username/password'));
  });

  it('test that a signed up user has a jwt', async () => {
    const user = {
      userName: chance.word(),
      password: '1234',
      userRole: 'student'
    };

    const newUser = await request(app)
      .post('/api/v1/auth/signup')
      .send(user);

    return expect(newUser.header['set-cookie'][0]).toEqual(expect.any(String));
  });

  it('test that a logged in user has a jwt', async () => {
    const user = {
      userName: 'benwa',
      password: '1234',
      userRole: 'student'
    };

    await request(app)
      .post('/api/v1/auth/signup')
      .send(user);

    const newUser = await request(app)
      .post('/api/v1/auth/login')
      .send(user);

    return expect(newUser.header['set-cookie'][0]).toEqual(expect.any(String));
  });

  it('should insert a user into the DB via POST', async () => {
    const user = {
      userName: chance.word(),
      password: '1234',
      userRole: 'student'
    };

    return request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .then(res => expect(res.body).toEqual({ id: expect.any(String), userName: expect.any(String), userRole: 'student' }));
  });

  // test for same userName signups

  it('should login a user via POST', async () => {
    const user = {
      userName: 'benwa',
      password: '1234',
      userRole: 'student'
    };

    await request(app)
      .post('/api/v1/auth/signup')
      .send(user);

    return request(app)
      .post('/api/v1/auth/login')
      .send(user)
      .then(res => expect(res.body).toEqual({ id: expect.any(String), userName: 'benwa', userRole: 'student' }));
  });

  // test for failed login
  // it('should fail to signup a user who is already loged in');
});
