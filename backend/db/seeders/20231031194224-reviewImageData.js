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
        reviewId: 1,
        url: 'https://picsum.photos/201'
      },
      {
        reviewId: 2,
        url: 'https://picsum.photos/202'
      },
      {
        reviewId: 2,
        url: 'https://picsum.photos/203'
      },
      {
        reviewId: 3,
        url: 'https://picsum.photos/204'
      },
      {
        reviewId: 4,
        url: 'https://picsum.photos/205'
      },
      {
        reviewId: 3,
        url: 'https://picsum.photos/206'
      },
    ], options, { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: { [Op.in]: [ 'https://picsum.photos/206', 'https://picsum.photos/205', 'https://picsum.photos/204', 'https://picsum.photos/203', 'https://picsum.photos/202', 'https://picsum.photos/201', 'https://picsum.photos/200'] }
    }, {});
  }
};
