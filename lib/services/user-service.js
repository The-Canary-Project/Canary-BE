const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/User');

const signup = async ({ userName, password, userRole }) => {
  const passwordHash = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));

  // fix unique error here
  const addUser = await User.insert({
    userName,
    passwordHash,
    userRole
  });

  return addUser;
};

//Authorize goes here
const authorize = async ({ userName, password }) => {
  const user = await User.findByUserName(userName);

  if (!user) throw new Error('Invalid username/password');

  const validPassword = await bcrypt.compare(password, user.passwordHash);
  if (!validPassword) throw new Error('Invalid username/password');

  return user;
};

const authToken = user => {
  const token = jwt.sign({
    payload: user.toJSON()
  }, process.env.APP_SECRET, {
    expiresIn: '24h'
  });

  return token;
};

const verifyToken = token => {
  const { payload } = jwt.verify(token, process.env.APP_SECRET);
  return payload;
};

const setSessionCookie = (res, user) => {
  const token = authToken(user);
  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie('session', token, {
    maxAge: oneDay,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    httpOnly: true
  });
};

module.exports = {
  signup,
  authorize,
  authToken,
  verifyToken,
  setSessionCookie,
};
