const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');

describe('Canary-BE routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('should insert a user into the DB via POST', async () => {
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
  it('should throw an error if a user signs up with an already taken username', async () => {
    const user = {
      userName: 'benwa',
      password: '1234',
      userRole: 'student'
    };

    await request(app)
      .post('/api/v1/auth/signup')
      .send(user)

    return await request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .then(res => expect(res.body.message).toEqual('duplicate key value violates unique constraint \"users_user_name_key\"'))
  })

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
      .then(res => expect(res.body.message).toEqual('Invalid username/password'))

    await request(app)
      .post('/api/v1/auth/login')
      .send({
        userName: 'benwaaa',
        password: '1234'
      })
      .then(res => expect(res.body.message).toEqual('Invalid username/password'))
  })
});
