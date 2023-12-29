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
        spotId: 9,
        userId: 1,
        startDate: 2024-0o5-10,
        endDate: 2024-0o5-15
      },
      {
        spotId: 10,
        userId: 1,
        startDate: 2024-10-0o2,
        endDate: 2024-10-16
      },
      {
        spotId: 4,
        userId: 2,
        startDate: 2024-11-0o1,
        endDate: 2024-11-22
      },
      {
        spotId: 3,
        userId: 6,
        startDate: 2024-0o7-25,
        endDate: 2024-0o7-26
      },
      {
        spotId: 9,
        userId: 9,
        startDate: 2024-0o5-16,
        endDate: 2024-0o5-25
      },
      {
        spotId: 13,
        userId: 9,
        startDate: 2024-0o6-0o2,
        endDate: 2024-0o6-12
      },
      {
        spotId: 11,
        userId: 9,
        startDate: 2024-12-12,
        endDate: 2024-12-27
      },
      {
        spotId: 1,
        userId: 11,
        startDate: 2024-0o4-28,
        endDate: 2024-0o5-0o5
      },
      {
        spotId: 9,
        userId: 12,
        startDate: 2024-0o5-0o1,
        endDate: 2024-0o5-10
      },
      {
        spotId: 3,
        userId: 12,
        startDate: 2024-0o6-11,
        endDate: 2024-0o6-15
      },
      {
        spotId: 11,
        userId: 12,
        startDate: 2024-11-0o2,
        endDate: 2024-11-10
      },
      {
        spotId: 1,
        userId: 12,
        startDate: 2024-0o4-0o1,
        endDate: 2024-0o4-0o2
      },
      {
        spotId: 7,
        userId: 13,
        startDate: 2024-0o7-0o2,
        endDate: 2024-0o7-0o7
      },
      {
        spotId: 6,
        userId: 13,
        startDate: 2024-12-28,
        endDate: 2025-0o1-0o3
      },
      {
        spotId: 8,
        userId: 15,
        startDate: 2024-0o1-14,
        endDate: 2024-0o3-28
      }
    ], options, { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] }
    }, {});
  }
};
