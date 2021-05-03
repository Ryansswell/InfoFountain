const { Post } = require('../models');

const postData = [
    {
        title: 'Titanic',
        post_text: 'Titanic was a long movie Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        user_id: '4',
    },
    {
        title: 'Winter is Coming',
        post_text: 'The wall has been breached, Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        user_id: '2',
    },
    {
        title: 'Get to da Choppa!',
        post_text: 'Hasta la vista, baby,  Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        user_id: '3',
    },
    {
        title: 'Sharkweek is Here!',
        post_text: 'We are gonna need a bigger boat, Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        user_id: '5',
    },
    {
        title: 'Dogs are Good',
        post_text: 'Woof woof, Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        user_id: '1',
    },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
