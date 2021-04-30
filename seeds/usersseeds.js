const { User } = require('../models');

const userData = [
  {
    username: 'james',
    email: 'james@email.com',
    password: 'password',
  },
  {
    username: 'karen',
    email: 'karen@email.com',
    password: 'password',
  },
  {
    username: 'sonny',
    email: 'sonny@email.com',
    password: 'password',
  },
  {
    username: 'scooby',
    email: 'scooby@mail.com',
    password: 'password',
  },
  {
    username: 'shaggy',
    email: 'shaggy@email.com',
    password: 'password',
  }
];

const seedUsers = () => User.bulkCreate(userData, {
  individualHooks: true
});

module.exports = seedUsers;
