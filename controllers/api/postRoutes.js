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

  try {

    const commentData = req.body;
    commentData.post_id = req.params.id;
    commentData.user_id = req.session.userId


    const newComment = await Comment.create(commentData, {
      where: { post_id: req.params.id }
    });

    // Serialize data so the template can read it
    const comments = newComment.get({ plain: true });
    // Pass serialized data and session flag into template
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;