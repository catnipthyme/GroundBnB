'use strict';

const { Review, Spot, User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate([
      {
        spotId: 1,
        userId: 3,
        review: '',
        stars: 2
      },
      {
        spotId: 2,
        userId: 3,
        review: '',
        stars: 5
      },
      {
        spotId: 3,
        userId: 3,
        review: '',
        stars: 1
      },
      {
        spotId: 2,
        userId: 4,
        review: '',
        stars: 4
      },
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['DemoUser1', 'DemoUser2', 'DemoUser3'] }
    }, {});
  }
};
