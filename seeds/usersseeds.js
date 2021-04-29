const { User } = require('../models');

const userData = [
  {
    username: 'james01',
    email: 'james@jamessemail.com',
    password: 'pa$$word1',
  },
  {
    username: 'karen02',
    email: 'karen@karensemail.com',
    password: 'pa$$word2',
  },
  {
    username: 'sonny03',
    email: 'sonny@sonnysemail.com',
    password: 'pa$$word3',
  },
  {
    username: 'scooby04',
    email: 'scooby@scoobysemail.com',
    password: 'pa$$word4',
  },
  {
    username: 'shaggy',
    email: 'shaggy@shaggysemail.com',
    password: 'pa$$word4',
  }
];

const seedUsers = () => User.bulkCreate(userData, {
  individualHooks: true
});

module.exports = seedUsers;
