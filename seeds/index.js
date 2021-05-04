const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

// const seedUsers = require('./usersseeds');
// const seedPosts = require('./postseeds');
// const seedComments = require('./seedscomments');

// const seedDatabase = async (req, res) => {

//   try {
//     await sequelize.sync({ force: false });

//     await seedUsers();
//     console.log('/n-----------Users Seeded--------');

//     await seedPosts();
//     console.log('/n-----------Posts Seeded--------');

//     await seedComments();
//     console.log('/n-----------Comments Seeded--------');

//     process.exit(0);

//   } catch (err) {

//   }
// }


// seedDatabase();




const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Post.bulkCreate(postData, {
    individualHooks: true,
    returning: true,
  });

  await Comment.bulkCreate(commentData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();

