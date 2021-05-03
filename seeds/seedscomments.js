const { Comment } = require('../models');

const commentData = [
    {
        user_id: '1',
        post_id: '3',
        comment_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
        user_id: '2',
        post_id: '1',
        comment_text: 'Lorem ipsum dolor sit amet,  dolore magna aliqua.!',
    },
    {
        user_id: '4',
        post_id: '2',
        comment_text: 'Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.this is superb!',
    },
    {
        user_id: '3',
        post_id: '4',
        comment_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.this is Crazy!',
    },
    {
        user_id: '5',
        post_id: '3',
        comment_text: 'Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.!',
    },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
