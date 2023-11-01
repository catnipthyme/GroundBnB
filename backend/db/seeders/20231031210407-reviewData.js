'use strict';

const { Review, Spot, User } = require('../models');
const bcrypt = require("bcryptjs");


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate([
      {
        spotId: 1,
        userId: 3,
        review: 'Nice lack of view, but they want you to sweep when you leave?  Like why, the floor is dirt?',
        stars: 3
      },
      {
        spotId: 2,
        userId: 3,
        review: "I don't know, does this really count as a ground dwelling? It's over ice... sort of misleading, ngl",
        stars: 2
      },
      {
        spotId: 3,
        userId: 3,
        review: 'Had the feel of a doomsday bunker. Not even a full bathroom -- only a pot in a corner. Disappointing.',
        stars: 1
      },
      {
        spotId: 2,
        userId: 4,
        review: 'What is this, icebnb? -eyerollemoji-',
        stars: 4
      },
    ], options, { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      review: { [Op.in]: ["I don't know, does this really count as a ground dwelling? It's over ice... sort of misleading, ngl", 'Had the feel of a doomsday bunker. Not even a full bathroom -- only a pot in a corner. Disappointing.', 'What is this, icebnb? -eyerollemoji-'] }
    }, {});
  }
};
