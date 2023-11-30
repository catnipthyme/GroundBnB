// Seeder wip
// add
// fix down portion

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
        startDate: 2023-11-14,
        endDate: 2023-11-23
      },
      {
        spotId: 1,
        userId: 2,
        startDate: 2023-12-0o5,
        endDate: 2023-12-12
      },
      {
        spotId: 2,
        userId: 2,
        startDate: 2023-12-13,
        endDate: 2023-12-20
      },
      {
        spotId: 3,
        userId: 3,
        startDate: 2023-12-0o1,
        endDate: 2023-12-0o3
      },
    ], options, { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
