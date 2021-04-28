const { Comment } = require('../models');

const commentData = [
    {
        user_id: '1',
        post_id: '3',
        comment_text: 'User 1 post 3, this is Great!',
    },
    {
        user_id: '2',
        post_id: '1',
        comment_text: 'User 2 post, 1 this is Amazing!',
    },
    {
        user_id: '4',
        post_id: '2',
        comment_text: 'User 4 post 2, this is superb!',
    },
    {
        user_id: '3',
        post_id: '4',
        comment_text: 'User 3 post 4, this is Crazy!',
    },
    {
        user_id: '5',
        post_id: '3',
        comment_text: 'User 5 post 3, this is Gnarly!',
    },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
