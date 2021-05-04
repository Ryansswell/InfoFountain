const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const seedUsers = require('./usersseeds');
const seedPosts = require('./postseeds');
const seedComments = require('./seedscomments');

const seedDatabase = async (req, res) => {

  try {
    await sequelize.sync({ force: true });

    await seedUsers();
    console.log('/n-----------Users Seeded--------');

    await seedPosts();
    console.log('/n-----------Posts Seeded--------');

    await seedComments();
    console.log('/n-----------Comments Seeded--------');

    process.exit(0);

  } catch (err) {

  }
}


seedDatabase();
