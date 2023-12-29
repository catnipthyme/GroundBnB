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
        url: 'https://groundbnbucket.s3.us-west-2.amazonaws.com/Spot-images/spot1-a.jpg',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://groundbnbucket.s3.us-west-2.amazonaws.com/Spot-images/spot1-b.jpg',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://groundbnbucket.s3.us-west-2.amazonaws.com/Spot-images/spot1-c.jpg',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://groundbnbucket.s3.us-west-2.amazonaws.com/Spot-images/spot1-d.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://groundbnbucket.s3.us-west-2.amazonaws.com/Spot-images/spot2-a.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://groundbnbucket.s3.us-west-2.amazonaws.com/Spot-images/spot2-b.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://groundbnbucket.s3.us-west-2.amazonaws.com/Spot-images/spot2-c.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://groundbnbucket.s3.us-west-2.amazonaws.com/Spot-images/spot3-a.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://groundbnbucket.s3.us-west-2.amazonaws.com/Spot-images/spot3-b.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://groundbnbucket.s3.us-west-2.amazonaws.com/Spot-images/spot4-c.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://groundbnbucket.s3.us-west-2.amazonaws.com/Spot-images/spot3-d.jpg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://groundbnbucket.s3.us-west-2.amazonaws.com/Spot-images/spot4-a.jpg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://groundbnbucket.s3.us-west-2.amazonaws.com/Spot-images/spot4-b.jpg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://groundbnbucket.s3.us-west-2.amazonaws.com/Spot-images/spot4-c.jpg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://groundbnbucket.s3.us-west-2.amazonaws.com/Spot-images/spot4-d.jpg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://groundbnbucket.s3.us-west-2.amazonaws.com/Spot-images/spot4-e.jpg',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://groundbnbucket.s3.us-west-2.amazonaws.com/Spot-images/spot5-a.jpg',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://groundbnbucket.s3.us-west-2.amazonaws.com/Spot-images/spot5-b.jpg',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://groundbnbucket.s3.us-west-2.amazonaws.com/Spot-images/spot5-c.jpg',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://groundbnbucket.s3.us-west-2.amazonaws.com/Spot-images/spot5-d.jpg',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://groundbnbucket.s3.us-west-2.amazonaws.com/Spot-images/spot6-a.jpg',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://groundbnbucket.s3.us-west-2.amazonaws.com/Spot-images/spot6-b.jpg',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://groundbnbucket.s3.us-west-2.amazonaws.com/Spot-images/spot6-c.jpg',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://groundbnbucket.s3.us-west-2.amazonaws.com/Spot-images/spot6-d.jpg',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://groundbnbucket.s3.us-west-2.amazonaws.com/Spot-images/spot6-e.jpg',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://groundbnbucket.s3.us-west-2.amazonaws.com/Spot-images/spot6-f.jpg',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://groundbnbucket.s3.us-west-2.amazonaws.com/Spot-images/spot7-a.jpg',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://groundbnbucket.s3.us-west-2.amazonaws.com/Spot-images/spot8-a.jpg',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://groundbnbucket.s3.us-west-2.amazonaws.com/Spot-images/spot8-b.jpg',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://groundbnbucket.s3.us-west-2.amazonaws.com/Spot-images/spot8-c.jpg',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://groundbnbucket.s3.us-west-2.amazonaws.com/Spot-images/spot8-d.jpg',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://groundbnbucket.s3.us-west-2.amazonaws.com/Spot-images/spot8-e.jpg',
        preview: true
      }
      ,
      {
        spotId: 9,
        url: 'https://groundbnbucket.s3.us-west-2.amazonaws.com/Spot-images/spot9-a.jpg',
        preview: true
      },
      {
        spotId: 10,
        url: 'https://groundbnbucket.s3.us-west-2.amazonaws.com/Spot-images/spot10-a.jpg',
        preview: true
      },
      {
        spotId: 11,
        url: 'https://groundbnbucket.s3.us-west-2.amazonaws.com/Spot-images/spot11-a.jpg',
        preview: true
      },
      {
        spotId: 12,
        url: 'https://groundbnbucket.s3.us-west-2.amazonaws.com/Spot-images/spot12-a.jpg',
        preview: true
      },
      {
        spotId: 13,
        url: 'https://groundbnbucket.s3.us-west-2.amazonaws.com/Spot-images/spot13-a.jpg',
        preview: true
      },
      {
        spotId: 14,
        url: 'https://groundbnbucket.s3.us-west-2.amazonaws.com/Spot-images/spot14-a.jpg',
        preview: true
      },
      {
        spotId: 15,
        url: 'https://groundbnbucket.s3.us-west-2.amazonaws.com/Spot-images/spot15-a.jpg',
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
