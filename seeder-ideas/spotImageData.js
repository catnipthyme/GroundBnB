// Seeder wip
// add between 0-3 images per spot (15 spots)
// fix down portion

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
        url: '',
        preview:
      },
      {
        spotId: 1,
        url: '',
        preview:
      },
      {
        spotId: 1,
        url: '',
        preview:
      },
      {
        spotId: 2,
        url: '',
        preview:
      },
      {
        spotId: 2,
        url: '',
        preview: ,
      },
      {
        spotId: 3,
        url: '',
        preview: ,
      },
      {
        spotId: 4,
        url: '',
        preview: ,
      },
      {
        spotId: 4,
        url: '',
        preview: ,
      },
      {
        spotId: 4,
        url: '',
        preview: ,
      },
      {
        spotId: 5,
        url: '',
        preview: ,
      },
      {
        spotId: 5,
        url: '',
        preview: ,
      },
      {
        spotId: 6,
        url: '',
        preview: ,
      },
      {
        spotId: 6,
        url: '',
        preview: ,
      },
      {
        spotId: 7,
        url: '',
        preview: ,
      },
      {
        spotId: 8,
        url: '',
        preview: ,
      },
      {
        spotId: 10,
        url: '',
        preview: ,
      },
      {
        spotId: 10,
        url: '',
        preview: ,
      },
      {
        spotId: 10,
        url: '',
        preview: ,
      },
      {
        spotId: 11,
        url: '',
        preview: ,
      },
      {
        spotId: 11,
        url: '',
        preview: ,
      },
      {
        spotId: 12,
        url: '',
        preview: ,
      },
      {
        spotId: 13,
        url: '',
        preview: ,
      },
      {
        spotId: 13,
        url: '',
        preview: ,
      },
      {
        spotId: 14,
        url: '',
        preview: ,
      },
      {
        spotId: 14,
        url: '',
        preview: ,
      },
      {
        spotId: 15,
        url: '',
        preview: ,
      }
    ], options, { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: { [Op.in]: ['https://picsum.photos/207', 'https://picsum.photos/208', 'https://picsum.photos/209', 'https://picsum.photos/210'] }
    }, {});
  }
};
