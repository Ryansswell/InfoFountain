const router = require('express').Router();
const { Post, Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');





router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = req.body;
    newPost.username = req.session.username;
    newPost.user_id = req.session.userId;

    const postData = await Post.create(newPost);
    const posts = postData.get({ plain: true });
    res
      .status(200).json({ post: posts, message: 'Your new post has been submitted!' });
  } catch (err) {
    res.status(400).json(err);
  }
});


router.post('/:id', withAuth, async (req, res) => {
  console.log(req.session);
  try {
    const commentData = await Comment.create(req.body, {
      where: { post_id: req.params.id }
    });
    commentData.post_id = req.params.id;
    commentData.user_id = req.session.userId
    // Serialize data so the template can read it
    const comments = commentData.get({ plain: true });
    // Pass serialized data and session flag into template
    res.status(200).json(comments);
    // res.render('rendercomments', {
    //     comments,
    //     logged_in: req.session.logged_in
    // });
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;