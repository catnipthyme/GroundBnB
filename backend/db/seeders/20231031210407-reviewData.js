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
        spotId: '',
        userId: '',
        review: '',
        stars: ''
      },
      {
        spotId: '',
        userId: '',
        review: '',
        stars: ''
      },
      {
        spotId: '',
        userId: '',
        review: '',
        stars: ''
      },
      {
        spotId: '',
        userId: '',
        review: '',
        stars: ''
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
