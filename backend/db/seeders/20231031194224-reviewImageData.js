'use strict';

const { ReviewImage, Review } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await ReviewImage.bulkCreate([
      {
        reviewId: '',
        url: ''
      },
      {
        reviewId: '',
        url: ''
      },
      {
        reviewId: '',
        url: ''
      },
      {
        reviewId: '',
        url: ''
      },
      {
        reviewId: '',
        url: ''
      },
      {
        reviewId: '',
        url: ''
      },
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['DemoUser1', 'DemoUser2', 'DemoUser3'] }
    }, {});
  }
};
