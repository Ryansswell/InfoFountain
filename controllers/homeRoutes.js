const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');


// ####################### Get All Posts #############################
// ####################### Get All Posts #############################
// ####################### Get All Posts #############################

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });
    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));
    // Pass serialized data and session flag into template
    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// ####################### Get All Posts by ID #############################
// ####################### Get All Posts by ID #############################
// ####################### Get All Posts by ID #############################

router.get('/posts/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });
    const post = postData.get({ plain: true });
    res.render('singlepost', {
      post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// ####################### Get Login Page #############################
// ####################### Get Login Page #############################
// ####################### Get Login Page #############################

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the user's portal page
  if (req.session.logged_in) {
    res.redirect('/portal');
    return;
  }

  res.render('login');
});


// ####################### Get User's Portal Page #############################
// ####################### Get User's Portal Page #############################
// ####################### Get User's Portal Page #############################

router.get('/portal', async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    // const userData = await User.findByPk(req.session.user_id, {
    const userData = await User.findByPk(1, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });
    const user = userData.get({ plain: true });
    res.render('portal', {
      user,
      // logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
// router.get('/portal', async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ['password'] },
//       include: [{ model: Post }],
//     });

//     const user = userData.get({ plain: true });

//     res.render('portal', {
//       user,
//       logged_in: true,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });



module.exports = router;
