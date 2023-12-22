'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        email: 'demo1@user.io',
        username: 'DemoUser1',
        firstName: 'Demoichi',
        lastName: 'Userichi',
        hashedPassword: bcrypt.hashSync('password1')
      },
      {
        email: 'demo2@user.io',
        username: 'DemoUser2',
        firstName: 'Demoni',
        lastName: 'Userni',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'demo3@user.io',
        username: 'DemoUser3',
        firstName: 'Demosan',
        lastName: 'Usersan',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], options, { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['DemoUser1', 'DemoUser2', 'DemoUser3'] }
    }, {});
  }
};
