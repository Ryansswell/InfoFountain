const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');


// ####################### Get All Comments #############################
// ####################### Get All Comments #############################
// ####################### Get All Comments #############################

router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll({
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




module.exports = router;