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
        spotId: 3,
        userId: 1,
        startDate: '',
        endDate: ''
      },
      {
        spotId: 1,
        userId: 2,
        startDate: '',
        endDate: ''
      },
      {
        spotId: 2,
        userId: 2,
        startDate: '',
        endDate: ''
      },
      {
        spotId: 3,
        userId: 3,
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
