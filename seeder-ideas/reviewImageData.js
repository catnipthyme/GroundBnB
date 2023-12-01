// Seeder wip
// add 0-2 pics per review (30 reviews for 15 spots)
// fix down portion

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
        url: ''
      },
      {
        reviewId: 2,
        url: ''
      },
      {
        reviewId: 2,
        url: ''
      },
      {
        reviewId: 3,
        url: ''
      },
      {
        reviewId: 4,
        url: ''
      },
      {
        reviewId: 3,
        url: ''
      },
      {
        reviewId: 1,
        url: ''
      },
      {
        reviewId: 2,
        url: ''
      },
      {
        reviewId: 2,
        url: ''
      },
      {
        reviewId: 3,
        url: ''
      },
      {
        reviewId: 4,
        url: ''
      },
      {
        reviewId: 3,
        url: ''
      },
      {
        reviewId: 1,
        url: ''
      },
      {
        reviewId: 2,
        url: ''
      },
      {
        reviewId: 2,
        url: ''
      },
      {
        reviewId: 3,
        url: ''
      },
      {
        reviewId: 4,
        url: ''
      },
      {
        reviewId: 3,
        url: ''
      },
      {
        reviewId: 1,
        url: ''
      },
      {
        reviewId: 2,
        url: ''
      },
      {
        reviewId: 2,
        url: ''
      },
      {
        reviewId: 3,
        url: ''
      },
      {
        reviewId: 4,
        url: ''
      },
      {
        reviewId: 3,
        url: ''
      },
      {
        reviewId: 1,
        url: ''
      },
      {
        reviewId: 2,
        url: ''
      },
      {
        reviewId: 2,
        url: ''
      },
      {
        reviewId: 3,
        url: ''
      },
      {
        reviewId: 4,
        url: ''
      },
      {
        reviewId: 3,
        url: ''
      },
      {
        reviewId: 1,
        url: ''
      },
      {
        reviewId: 2,
        url: ''
      },
      {
        reviewId: 2,
        url: ''
      },
      {
        reviewId: 3,
        url: ''
      },
      {
        reviewId: 4,
        url: ''
      },
      {
        reviewId: 3,
        url: ''
      },
      {
        reviewId: 1,
        url: ''
      },
      {
        reviewId: 2,
        url: ''
      },
      {
        reviewId: 2,
        url: ''
      },
      {
        reviewId: 3,
        url: ''
      },
      {
        reviewId: 4,
        url: ''
      },
      {
        reviewId: 3,
        url: ''
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
