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
        url: 'https://picsum.photos/200'
      },
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
        reviewId: 2,
        url: 'https://picsum.photos/204'
      },
      {
        reviewId: 3,
        url: 'https://picsum.photos/205'
      },
      {
        reviewId: 3,
        url: 'https://picsum.photos/206'
      },
      {
        reviewId: 4,
        url: 'https://picsum.photos/207'
      },
      {
        reviewId: 5,
        url: 'https://picsum.photos/208'
      },
      {
        reviewId: 5,
        url: 'https://picsum.photos/209'
      },
      {
        reviewId: 6,
        url: 'https://picsum.photos/210'
      },
      {
        reviewId: 7,
        url: 'https://picsum.photos/211'
      },
      {
        reviewId: 8,
        url: 'https://picsum.photos/212'
      },
      {
        reviewId: 9,
        url: 'https://picsum.photos/213'
      },
      {
        reviewId: 10,
        url: 'https://picsum.photos/214'
      },
      {
        reviewId: 11,
        url: 'https://picsum.photos/215'
      },
      {
        reviewId: 12,
        url: 'https://picsum.photos/216'
      },
      {
        reviewId: 12,
        url: 'https://picsum.photos/217'
      },
      {
        reviewId: 12,
        url: 'https://picsum.photos/218'
      },
      {
        reviewId: 13,
        url: 'https://picsum.photos/219'
      },
      {
        reviewId: 14,
        url: 'https://picsum.photos/220'
      },
      {
        reviewId: 15,
        url: 'https://picsum.photos/221'
      },
      {
        reviewId: 16,
        url: 'https://picsum.photos/222'
      },
      {
        reviewId: 17,
        url: 'https://picsum.photos/223'
      },
      {
        reviewId: 18,
        url: 'https://picsum.photos/224'
      },
      {
        reviewId: 19,
        url: 'https://picsum.photos/225'
      },
      {
        reviewId: 20,
        url: 'https://picsum.photos/226'
      },
      {
        reviewId: 21,
        url: 'https://picsum.photos/227'
      },
      {
        reviewId: 22,
        url: 'https://picsum.photos/228'
      },
      {
        reviewId: 22,
        url: 'https://picsum.photos/229'
      },
      {
        reviewId: 23,
        url: 'https://picsum.photos/230'
      },
      {
        reviewId: 24,
        url: 'https://picsum.photos/231'
      },
      {
        reviewId: 25,
        url: 'https://picsum.photos/232'
      },
      {
        reviewId: 26,
        url: 'https://picsum.photos/233'
      },
      {
        reviewId: 26,
        url: 'https://picsum.photos/234'
      },
      {
        reviewId: 27,
        url: 'https://picsum.photos/235'
      },
      {
        reviewId: 28,
        url: 'https://picsum.photos/236'
      },
      {
        reviewId: 29,
        url: 'https://picsum.photos/237'
      },
      {
        reviewId: 29,
        url: 'https://picsum.photos/238'
      },
      {
        reviewId: 29,
        url: 'https://picsum.photos/239'
      },
      {
        reviewId: 30,
        url: 'https://picsum.photos/240'
      },
      {
        reviewId: 31,
        url: 'https://picsum.photos/241'
      },
    ], options, { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      reviewId: { [Op.in]: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31 ] }
    }, {});
  }
};
