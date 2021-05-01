const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');


// ####################### Get All Posts #############################
// ####################### Get All Posts #############################
// ####################### Get All Posts #############################

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const postData = await Post.findAll({
      include: [{ model: User, model: Comment }],
      // where: { post_id: post.id },
      order: [['date_created', 'DESC']],
    });
    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));
    console.log(posts)

    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn
    });

  } catch (err) {
    res.status(500).json(err);
  }
});



// ################### Get all Posts associated with that User for User Portal
// ################### Get all Posts associated with that User for User Portal
// ################### Get all Posts associated with that User for User Portal

router.get('/userportal', withAuth, async (req, res) => {
  console.log(req.session.userId);
  try {
    const userData = await Post.findAll({
      where: { user_id: req.session.userId },
      include: { model: User, attributes: ['username', 'email'] },
    });

    // console.log(post.user_id);
    console.log(req.session.userId);
    // Serialize data so the template can read it

    const data = userData.map((user) => user.get({ plain: true }));
    console.log(data);
    res
      .status(200)
      .json(data);

    // .render('userportal', {
    //   data,
    //   // loggedIn: req.session.loggedIn,
    // });
  } catch (err) {
    res.status(400).json(err);
  }
});


// ####################### Get Login Page #############################
// ####################### Get Login Page #############################
// ####################### Get Login Page #############################

router.get('/login', (req, res) => {
  res.render('login');
});

// ####################### Get All Users #############################(Just for testing)
// ####################### Get All Users #############################
// ####################### Get All Users #############################

// router.get('/allusers', async (req, res) => {
//   try {
//     // Get all Users and JOIN with user data
//     const userData = await User.findAll({
//       attributes: { exclude: ['password'] },
//       include: [{ model: Post }, { model: Comment }]
//     });
//     // Serialize data so the template can read it
//     const users = userData.map((user) => user.get({ plain: true }));
//     // Pass serialized data and session flag into template
//     // res.status(200).json(userData);

//     res.render('renderusers', {
//       users,
//       loggedIn: req.session.loggedIn
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });




module.exports = router;
