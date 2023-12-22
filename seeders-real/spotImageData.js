'use strict';

const { SpotImage, Spot } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: '../../../images/spots/spot1-a.jpg',
        preview: true
      },
      {
        spotId: 1,
        url: '../../../images/spots/spot1-b.jpg',
        preview: true
      },
      {
        spotId: 1,
        url: '../../../images/spots/spot1-c.jpg',
        preview: true
      },
      {
        spotId: 1,
        url: '../../../images/spots/spot1-d.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: '../../../images/spots/spot2-a.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: '../../../images/spots/spot2-b.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: '../../../images/spots/spot2-c.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: '../../../images/spots/spot3-a.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: '../../../images/spots/spot3-b.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: '../../../images/spots/spot4-c.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: '../../../images/spots/spot3-d.jpg',
        preview: true
      },
      {
        spotId: 4,
        url: '../../../images/spots/spot4-a.jpg',
        preview: true
      },
      {
        spotId: 4,
        url: '../../../images/spots/spot4-b.jpg',
        preview: true
      },
      {
        spotId: 4,
        url: '../../../images/spots/spot4-c.jpg',
        preview: true
      },
      {
        spotId: 4,
        url: '../../../images/spots/spot4-d.jpg',
        preview: true
      },
      {
        spotId: 4,
        url: '../../../images/spots/spot4-e.jpg',
        preview: true
      },
      {
        spotId: 5,
        url: '../../../images/spots/spot5-a.jpg',
        preview: true
      },
      {
        spotId: 5,
        url: '../../../images/spots/spot5-b.jpg',
        preview: true
      },
      {
        spotId: 5,
        url: '../../../images/spots/spot5-c.jpg',
        preview: true
      },
      {
        spotId: 5,
        url: '../../../images/spots/spot5-d.jpg',
        preview: true
      },
      {
        spotId: 6,
        url: '../../../images/spots/spot6-a.jpg',
        preview: true
      },
      {
        spotId: 6,
        url: '../../../images/spots/spot6-b.jpg',
        preview: true
      },
      {
        spotId: 6,
        url: '../../../images/spots/spot6-c.jpg',
        preview: true
      },
      {
        spotId: 6,
        url: '../../../images/spots/spot6-d.jpg',
        preview: true
      },
      {
        spotId: 6,
        url: '../../../images/spots/spot6-e.jpg',
        preview: true
      },
      {
        spotId: 6,
        url: '../../../images/spots/spot6-f.jpg',
        preview: true
      },
      {
        spotId: 7,
        url: '../../../images/spots/spot7-a.jpg',
        preview: true
      },
      {
        spotId: 8,
        url: '../../../images/spots/spot8-a.jpg',
        preview: true
      },
      {
        spotId: 8,
        url: '../../../images/spots/spot8-b.jpg',
        preview: true
      },
      {
        spotId: 8,
        url: '../../../images/spots/spot8-c.jpg',
        preview: true
      },
      {
        spotId: 8,
        url: '../../../images/spots/spot8-d.jpg',
        preview: true
      },
      {
        spotId: 8,
        url: '../../../images/spots/spot8-e.jpg',
        preview: true
      }
      ,
      {
        spotId: 9,
        url: '../../../images/spots/spot9-a.jpg',
        preview: true
      },
      {
        spotId: 10,
        url: '../../../images/spots/spot10-a.jpg',
        preview: true
      },
      {
        spotId: 11,
        url: '../../../images/spots/spot11-a.jpg',
        preview: true
      },
      {
        spotId: 12,
        url: '../../../images/spots/spot12-a.jpg',
        preview: true
      },
      {
        spotId: 13,
        url: '../../../images/spots/spot13-a.jpg',
        preview: true
      },
      {
        spotId: 14,
        url: '../../../images/spots/spot14-a.jpg',
        preview: true
      },
      {
        spotId: 15,
        url: '../../../images/spots/spot15-a.jpg',
        preview: true
      }
    ], options, { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] }
    }, {});
  }
};
