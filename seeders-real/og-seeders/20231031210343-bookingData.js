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
        startDate: "2023-11-14",
        endDate: "2023-11-23"
      },
      {
        spotId: 1,
        userId: 2,
        startDate: "2023-12-05",
        endDate: "2023-12-12"
      },
      {
        spotId: 2,
        userId: 2,
        startDate: "2023-12-13",
        endDate: "2023-12-20"
      },
      {
        spotId: 3,
        userId: 3,
        startDate: "2023-12-01",
        endDate: "2023-12-03"
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
