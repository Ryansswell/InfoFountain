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
    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// ####################### Get Post by ID #############################
// ####################### Get Post by ID #############################
// ####################### Get Post by ID #############################

router.get('/posts/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [{ model: User, attributes: ['username'] }, { model: Comment }],
    });
    const posts = postData.get({ plain: true });
    res.render('viewSingleArticle', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get('/create-post', withAuth, (req, res) => {
  // const post = postData.get({ plain: true });
  res.render('create-post');
});


// ################### Get all Posts associated with that User for User Portal
// ################### Get all Posts associated with that User for User Portal
// ################### Get all Posts associated with that User for User Portal

router.get('/userportal', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: { user_id: req.session.userId },
      include: [{ model: User, attributes: ['username'] }],
      order: [['date_created', 'DESC']],
    });
    // Serialize data so the template can read it
    const posts = postData.map((user) => user.get({ plain: true }));
    res
      .render('userportal', {
        posts,
        loggedIn: req.session.loggedIn,
        username: req.session.username,
      });
  } catch (err) {
    res.status(500).json(err);
  }
});


// ####################### Get Login Page #############################
// ####################### Get Login Page #############################
// ####################### Get Login Page #############################

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

module.exports = router;
