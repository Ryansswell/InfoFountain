const { Post } = require('../models');

const postData = [
    {
        title: 'Titanic',
        post_text: 'Titanic was a long movie',
        user_id: '4',
    },
    {
        title: 'Winter is Coming',
        post_text: 'The wall has been breached!',
        user_id: '2',
    },
    {
        title: 'Get to da Choppa!',
        post_text: 'Hasta la vista, baby',
        user_id: '3',
    },
    {
        title: 'Sharkweek is Here!',
        post_text: 'We are gonna need a bigger boat',
        user_id: '5',
    },
    {
        title: 'Dogs are Good',
        post_text: 'Woof woof',
        user_id: '1',
    },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
