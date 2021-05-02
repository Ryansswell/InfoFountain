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

// ####################### Get Post by ID #############################
// ####################### Get Post by ID #############################
// ####################### Get Post by ID #############################

router.get('/posts/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [{ model: User, attributes: ['username'] }]
    });
    const post = postData.get({ plain: true });
    res.render('viewSingleArticle', {
      post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// Use withAuth middleware to prevent access to route
// router.get('/userportal', withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ['password'] },
//       include: [{ model: Post }],
//     });

//     const user = userData.get({ plain: true });

//     res.render('userportal', {
//       ...user,
//       logged_in: true,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });



// ################### Get all Posts associated with that User for User Portal
// ################### Get all Posts associated with that User for User Portal
// ################### Get all Posts associated with that User for User Portal

router.get('/users/userportal', async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: { user_id: req.session.userId },
      include: [{ model: User, attributes: ['username'] }]
    });

    // console.log(postData);
    // console.log(req.session.userId);
    // Serialize data so the template can read it

    const posts = postData.map((user) => user.get({ plain: true }));

    console.log(posts);

    res
      // .status(200)
      // .json(posts);


      .render('userportal', {
        posts,
        loggedIn: req.session.loggedIn,


      });

    // console.log(data);

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
