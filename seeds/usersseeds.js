const { User } = require('../models');

const userData = [
  {
    name: 'James',
    username: 'james01',
    email: 'james@jamessemail.com',
    password: 'pa$$word1',
  },
  {
    name: 'Karen',
    username: 'karen02',
    email: 'karen@karensemail.com',
    password: 'pa$$word2',
  },
  {
    name: 'sonny',
    username: 'sonny03',
    email: 'sonny@sonnysemail.com',
    password: 'pa$$word3',
  },
  {
    name: 'scooby',
    username: 'scooby04',
    email: 'scooby@scoobysemail.com',
    password: 'pa$$word4',
  },
  {
    name: 'shaggy',
    username: 'shaggy05',
    email: 'shaggy@shaggysemail.com',
    password: 'pa$$word5',
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
