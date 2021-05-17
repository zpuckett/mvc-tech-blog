const { User } = require('../models');

const userData = [{
        username: 'Kate',
        password: 'kate'

    },
    {
        username: 'Tim',
        password: 'tim'
    },
    {
        username: 'Bill',
        password: 'bill'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;