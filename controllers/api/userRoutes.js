const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User, Comment, Post } = require('../../models');


// ########################### Create a New User #############################
// ########################### Create a New User #############################
// ########################### Create a New User #############################

router.post('/', async (req, res) => {
    try {
        const newUser = req.body;
        const userData = await User.create(newUser);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.loggedIn = true;
            req.session.username = userData.username;
            req.session.email = userData.email;

            res.status(200).json(req.session);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});




// router.post('/', async (req, res) => {
//     try {
//         const newUser = req.body;
//         const userData = await User.create(newUser);

//         // Set up sessions with a 'loggedIn' variable set to `true`
//         req.session.save(() => {
//             req.session.loggedIn = true;
//             req.session.username = userData.username;
//             req.session.userId = userData.id;
//             req.session.email = userData.email;
//         });
//         const users = userData.get({ plain: true });

//         res.status(200).json({ user: users, message: 'You are now logged in!' });

//     } catch (err) {

//         res.status(400).json(err);
//     }
// });


// #################### Post - User Login ###################
// #################### Post - User Login ###################
// #################### Post - User Login ###################

router.post('/login', async (req, res) => {
    try {
        // First we find one user record with an email address that matches the one provided by the user logging in
        const userData = await User.findOne({ where: { email: req.body.email } });
        // console.log(userData);
        // If an account with that email address doesn't exist, the user will recieve an error message
        if (!userData) {
            res
                .status(401)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }
        // If the user does exist, we will use the checkPassword() instance method to compare the user's input to the password stored in the record
        const validPassword = await userData.checkPassword(req.body.password);
        // If checkPassword() evaluates as false, the user will receive an error message
        if (!validPassword) {
            res
                .status(401)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }
        // If checkPassword() evaluates as true, the user will be logged in
        //   Once the user successfully logs in, set up the sessions variable 'loggedIn'
        req.session.save(() => {
            req.session.username = userData.username;
            req.session.userId = userData.id;
            req.session.email = userData.email;
            req.session.loggedIn = true;

            const user = userData.get({ plain: true });

            res.status(200).json({ user: user, message: 'You are now logged in!' });

        })
    } catch (err) {
        res.status(400).json(err);
    }
});




// ################ User Logout ##########################
// ################ User Logout ##########################
// ################ User Logout ##########################

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        // Remove the session variables
        req.session.destroy(() => {
            res
                // .status(204).end();
                .render('homepage');
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
