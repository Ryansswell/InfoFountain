const router = require('express').Router();
const { Post, Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');





router.post('/', async (req, res) => {
  try {
    req.body.user_id = req.session.userId;
    req.body.username = req.session.username;

    const newPost = req.body;
    const postData = await Post.create(newPost);


    const posts = postData.get({ plain: true });
    console.log(posts);

    res
      .status(200).json({ post: posts, message: 'Your new post has been submitted!' });
    // res.render('homepage', {
    //   posts,
    //   loggedIn: req.session.loggedIn
    // });
  } catch (err) {

    res.status(400).json(err);
  }
});


// router.delete('/:id', withAuth, async (req, res) => {
//   try {
//     const postData = await Post.destroy({
//       where: {
//         id: req.params.id,
//         post_id: req.session.post_id,
//       },
//     });

//     if (!postData) {
//       res.status(404).json({ message: 'No post found with this id!' });
//       return;
//     }

//     res.status(200).json(postData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.post('/commentPost', withAuth, async (req, res) => {
//   try {
//     const commentPost = await Comment.create(req.body);

//     req.session.save(() => {
//       req.session.commentPost_id = commentPost.id;
//       req.session.logged_in = true;
//     });

//     res.status(200).json(commentPost);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });


// router.delete('/comment/:id', withAuth, async (req, res) => {
//   try {
//     const postDelete = await Comment.destroy({
//       where: {
//         id: req.params.id,
//         post_id: req.session.postdelete_id,
//       },
//     });

//     if (!postDelete) {
//       res.status(404).json({ message: 'This post is deleted!' });
//       return;
//     }

//     res.status(200).json(postDelete);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
// router.post('/commentPost', withAuth, async (req, res) => {
//   try {
//     const commentPost = await Comment.create(req.body);
//     req.session.save(() => {
//       req.session.commentPost_id = commentPost.id;
//       req.session.logged_in = true;
//     });
//     res.status(200).json(commentPost);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });
// router.delete('/comment/:id', withAuth, async (req, res) => {
//   try {
//     const postDelete = await Comment.destroy({
//       where: {
//         id: req.params.id,
//         post_id: req.session.postdelete_id,
//       },
//     });
//     if (!postDelete) {
//       res.status(404).json({ message: 'This post is deleted!' });
//       return;
//     }
//     res.status(200).json(postDelete);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
module.exports = router;