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
        url: 'https://picsum.photos/207',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://picsum.photos/208',
        preview: true,
      },
      {
        spotId: 3,
        url: 'https://picsum.photos/209',
        preview: true,
      },
      {
        spotId: 3,
        url: 'https://picsum.photos/210',
        preview: false,
      },
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
