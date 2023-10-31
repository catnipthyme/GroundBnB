'use strict';

const { Booking, Spot, User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Booking.bulkCreate([
      {
        spotId: '',
        userId: '',
        startDate: '',
        endDate: ''
      },
      {
        spotId: '',
        userId: '',
        startDate: '',
        endDate: ''
      },
      {
        spotId: '',
        userId: '',
        startDate: '',
        endDate: ''
      },
      {
        spotId: '',
        userId: '',
        startDate: '',
        endDate: ''
      },
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['DemoUser1', 'DemoUser2', 'DemoUser3'] }
    }, {});
  }
};
