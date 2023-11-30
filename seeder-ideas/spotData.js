// Seeder wip
// add 15 spots
// fix down portion

'use strict';

const { Spot, User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: '4832 NW Thisisaroad Drive Apartment 5',
        city: 'Spokane',
        state: 'Washington',
        country: 'USA',
        lat: 47.702,
        lng: -117.383,
        name: "Mole Hill",
        description: 'A particularly large mole hill in the yard',
        price: 20.00
      },
      {
        ownerId: 2,
        address: '1 Cold Lane Unit 3',
        city: 'A Random Glacier',
        state: 'Nunavut',
        country: 'Canada',
        lat: 68.7748,
        lng: -92.33,
        name: 'Icy Abode',
        description: 'Some polar bear den in the snow',
        price: 75.00
      },
      {
        ownerId: 1,
        address: '4832 NW Thisisaroad Drive Apartment 3',
        city: 'Spokane',
        state: 'Washington',
        country: 'USA',
        lat: 47.702,
        lng: -117.383,
        name: 'Decorated Basement',
        description: 'Just a basement with all the basic ammenities and only a little bit of mold',
        price: 60.00
      },
      {
        ownerId: 1,
        address: '4832 NW Thisisaroad Drive Apartment 4',
        city: 'Spokane',
        state: 'Washington',
        country: 'USA',
        lat: 47.703,
        lng: -117.384,
        name: 'Probably Not A Trap',
        description: 'No, there really is a lovely cask of Amanontillado in that closet, I swear...',
        price: 5.00
      },
      {
        ownerId: ,
        address: '',
        city: '',
        state: '',
        country: '',
        lat: ,
        lng: ,
        name: '',
        description: '',
        price:
      },
      {
        ownerId: ,
        address: '',
        city: '',
        state: '',
        country: '',
        lat: ,
        lng: ,
        name: '',
        description: '',
        price:
      },
      {
        ownerId: ,
        address: '',
        city: '',
        state: '',
        country: '',
        lat: ,
        lng: ,
        name: '',
        description: '',
        price:
      },
      {
        ownerId: ,
        address: '',
        city: '',
        state: '',
        country: '',
        lat: ,
        lng: ,
        name: '',
        description: '',
        price:
      },
      {
        ownerId: ,
        address: '',
        city: '',
        state: '',
        country: '',
        lat: ,
        lng: ,
        name: '',
        description: '',
        price:
      },
      {
        ownerId: ,
        address: '',
        city: '',
        state: '',
        country: '',
        lat: ,
        lng: ,
        name: '',
        description: '',
        price:
      },
      {
        ownerId: ,
        address: '',
        city: '',
        state: '',
        country: '',
        lat: ,
        lng: ,
        name: '',
        description: '',
        price:
      },
      {
        ownerId: ,
        address: '',
        city: '',
        state: '',
        country: '',
        lat: ,
        lng: ,
        name: '',
        description: '',
        price:
      },
      {
        ownerId: ,
        address: '',
        city: '',
        state: '',
        country: '',
        lat: ,
        lng: ,
        name: '',
        description: '',
        price:
      },
      {
        ownerId: ,
        address: '',
        city: '',
        state: '',
        country: '',
        lat: ,
        lng: ,
        name: '',
        description: '',
        price:
      },
      {
        ownerId: ,
        address: '',
        city: '',
        state: '',
        country: '',
        lat: ,
        lng: ,
        name: '',
        description: '',
        price:
      }
    ], options, { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Decorated Basement', 'Icy Abode', 'Mole Hill', 'No, there really is a lovely cask of Amanontillado in that closet, I swear...'] }
    }, {});
  }
};
