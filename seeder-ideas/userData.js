// Seeder wip
// add 15 users -- DONE
// fix down portion

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
      },
      {
        email: 'demo4@user.io',
        username: 'DemoUser4',
        firstName: 'Demoyon',
        lastName: 'Useryon',
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        email: 'demo5@user.io',
        username: 'DemoUser5',
        firstName: 'Demogo',
        lastName: 'Usergo',
        hashedPassword: bcrypt.hashSync('password5')
      },
      {
        email: 'demo6@user.io',
        username: 'DemoUser6',
        firstName: 'Demoroku',
        lastName: 'Userroku',
        hashedPassword: bcrypt.hashSync('password6')
      },
      {
        email: 'demo7@user.io',
        username: 'DemoUser7',
        firstName: 'Demoshichi',
        lastName: 'Usershichi',
        hashedPassword: bcrypt.hashSync('password7')
      },
      {
        email: 'demo8@user.io',
        username: 'DemoUser8',
        firstName: 'Demohachi',
        lastName: 'Userhachi',
        hashedPassword: bcrypt.hashSync('password8')
      },
      {
        email: 'demo9@user.io',
        username: 'DemoUser9',
        firstName: 'Demokyuu',
        lastName: 'Userkyuu',
        hashedPassword: bcrypt.hashSync('password9')
      },
      {
        email: 'demo10@user.io',
        username: 'DemoUser10',
        firstName: 'Demojuu',
        lastName: 'Userjuu',
        hashedPassword: bcrypt.hashSync('password10')
      },
      {
        email: 'demo11@user.io',
        username: 'DemoUser11',
        firstName: 'Demojuuichi',
        lastName: 'Userjuuichi',
        hashedPassword: bcrypt.hashSync('password11')
      },
      {
        email: 'demo12@user.io',
        username: 'DemoUser12',
        firstName: 'Demojuuni',
        lastName: 'Userjuuni',
        hashedPassword: bcrypt.hashSync('password12')
      },
      {
        email: 'demo13@user.io',
        username: 'DemoUser13',
        firstName: 'Demojuusan',
        lastName: 'Userjuusan',
        hashedPassword: bcrypt.hashSync('password13')
      },
      {
        email: 'demo14@user.io',
        username: 'DemoUser14',
        firstName: 'Demojuuyon',
        lastName: 'Userjuuyon',
        hashedPassword: bcrypt.hashSync('password14')
      },
      {
        email: 'demo15@user.io',
        username: 'DemoUser15',
        firstName: 'Demojuugo',
        lastName: 'Userjuugo',
        hashedPassword: bcrypt.hashSync('password15')
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
