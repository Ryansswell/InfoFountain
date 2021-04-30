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
        // Set up sessions with a 'loggedIn' variable set to `true`
        req.session.save(() => {
            req.session.email = userData.email;
            req.session.userId = userData.id;
            req.session.loggedIn = true;
        });
        const users = userData.get({ plain: true });
        res
            .status(200).json({ user: users, message: 'You are now logged in!' });
    } catch (err) {

        res.status(400).json(err);
    }
});


// #################### Post - User Login ###################
// #################### Post - User Login ###################
// #################### Post - User Login ###################

router.post('/login', async (req, res) => {
    try {
        // First we find one user record with an email address that matches the one provided by the user logging in
        const userData = await User.findOne({ where: { email: req.body.email } });
        console.log(userData);
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
            req.session.userId = userData.id;
            req.session.email = userData.email;
            req.session.loggedIn = true;
            console.log(req.session.loggedIn);

            const user = userData.get({ plain: true });
            res
                .status(200)
                .json({ user: user, message: 'You are now logged in!' });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});


// #################### Put - Update User Information ###################
// #################### Put - Update User Information ###################
// #################### Put - Update User Information ###################

router.put('/:id', async (req, res) => {
    try {
        const userData = await User.update(req.body, {
            where: {
                id: req.params.id,
            },
        });

        if (!userData) {
            console.log(req.params.id);
            res.status(404).json({ message: 'No user with this id!' });
            return;
        }
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});


// #################### Delete A User ###################
// #################### Delete A User ###################
// #################### Delete A User ###################

router.delete('/:id', async (req, res) => {
    try {
        const userData = await User.destroy({
            where: { id: req.params.id },
        });
        if (!userData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});


// ################ User Logout ##########################
// ################ User Logout ##########################
// ################ User Logout ##########################

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
