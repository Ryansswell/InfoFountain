const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');


// ################# Get All Comments For a Post ########################
// ################# Get All Comments For a Post ########################
// ################# Get All Comments For a Post ########################

router.post('/:id', async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            include: [{ model: Post }, { model: User }, { model: Comment }

            ],
            where: { post_id: req.params.id }
        });
        // Serialize data so the template can read it
        const comments = commentData.map((comment) => comment.get({ plain: true }));
        // Pass serialized data and session flag into template
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});


// ################# Add A Comment to a Post ########################
// ################# Add A Comment to a Post ########################
// ################# Add A Comment to a Post ########################

router.post('/:id', async (req, res) => {
    try {
        const commentData = await Comment.create(req.body, {
            where: {
                post_id: req.params.id,
            },
        });

        if (!commentData) {
            res.status(404).json({ message: 'No comment with this id!' });
            return;
        }
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;