const router = require('express').Router();
const { User, Comment, Post } = require('../../models');
const withAuth = require('../../utils/auth');


// ####################### Get All Posts #############################
// ####################### Get All Posts #############################
// ####################### Get All Posts #############################

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const postData = await Post.findAll({
      // include: [{ model: User, attributes: ['username'] }],
    });
    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));
    // Pass serialized data and session flag into template
    res.render('renderposts', {
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

router.get('/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {

      // NOT WORKING?
      // include: [{ model: User, attributes: ['username'] }],

    });
    const post = postData.get({ plain: true });
    res.render('renderposts', {
      post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// ################### Post a Comment ########################
// ################### Post a Comment ########################
// ################### Post a Comment ########################

router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});


// ################### Edit a Comment ########################
// ################### Edit a Comment ########################
// ################### Edit a Comment ########################

// router.post('/', withAuth, async (req, res) => {
//   try {
//     const newPost = await Post.update({
//       req.body,
//       user_id: req.session.user_id,
//     });
//     res.status(200).json(newPost);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });


// ###################### Delete A Comment ##########################
// ###################### Delete A Comment ##########################
// ###################### Delete A Comment ##########################

// router.delete('/:id', withAuth, async (req, res) => {
//   try {
//     const postData = await Post.destroy({
//       where: {
//         id: req.params.id,
//         user_id: req.session.user_id,
//       },
//     });
//     if (!postData) {
//       res.status(404).json({ message: 'No project found with this id!' });
//       return;
//     }
//     res.status(200).json(postData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
