const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');


// ################# Get All Comments For a Post ########################
// ################# Get All Comments For a Post ########################
// ################# Get All Comments For a Post ########################

router.get('/:id', async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            include: [{ model: Post }],
            where: { post_id: req.params.id }
        });
        // Serialize data so the template can read it
        const comments = commentData.map((comment) => comment.get({ plain: true }));
        // Pass serialized data and session flag into template
        res.render('rendercomments', {
            comments,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


// ################# Add A Comment to a Post ########################
// ################# Add A Comment to a Post ########################
// ################# Add A Comment to a Post ########################

router.post('/:id', withAuth, async (req, res) => {
    try {
        req.body.post_id = req.params.id;
        const newComment = req.body;
        const commentData = await Comment.create(newComment);

        // Set up sessions with a 'loggedIn' variable set to `true`

        res.status(200).json(commentData);
        // console.log(commentData);

    } catch (err) {
        res.status(400).json(err);
    }
});


// #################### Edit A Comment ###################
// #################### Edit A Comment ###################
// #################### Edit A Comment ###################

router.put('/:id', async (req, res) => {
    try {
        const commentData = await Comment.update(req.body, {
            where: {
                id: req.params.id,
            },
        });

        if (!commentData) {
            console.log(req.params.id);
            res.status(404).json({ message: 'No comment with this id!' });
            return;
        }
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});


// #################### Delete A Comment ###################
// #################### Delete A Comment ###################
// #################### Delete A Comment ###################

router.delete('/:id', async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
        }
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});




module.exports = router;