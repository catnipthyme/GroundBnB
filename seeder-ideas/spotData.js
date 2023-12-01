// Seeder wip
// add 15 spots -- DONE
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
        address: '4832 NW Thisisaroad Drive',
        city: 'Spokane',
        state: 'Washington',
        country: 'USA',
        lat: 47.702,
        lng: -117.383,
        name: "Decorated Basement",
        description: 'Just a basement with all the basic ammenities and only a little bit of mold. I am sure you will feel right at home!',
        price: 124.99
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
        description: 'Some polar bear den in the snow. Perfect for getting away from it all!',
        price: 26
      },
      {
        ownerId: 2,
        address: '15.3 kilometers north of the village',
        city: 'Sehithwa',
        state: 'NA',
        country: 'Botswana',
        lat: -20.46959,
        lng: 22.70002,
        name: 'Termite Mound',
        description: 'A child would probably fit in here, idk.',
        price: 87
      },

      {
        ownerId: 2,
        address: '1883 SE Secret Road Drive Unit 3',
        city: 'Sonora',
        state: 'Texas',
        country: 'USA',
        lat: 30.5409,
        lng: -102.3500,
        name: 'Crevice in a Cave',
        description: 'Spacious cavern, where all you have to worry about is bat guano! ',
        price: 5
      },
      {
        ownerId: 3,
        address: 'Via Maggiore, 87, 48342',
        city: 'Ravenna',
        state: 'Ravenna',
        country: 'Italy',
        lat: 44.42040,
        lng: 12.2148,
        name: 'Probably Not a Trap',
        description: 'No, there really is a lovely cask of Amontillado in that closet, here, let me show you!',
        price: 249.99
      },
      {
        ownerId: 3,
        address: '2 Wide Road',
        city: 'Hayden',
        state: 'New Mexico',
        country: 'USA',
        lat: 35.984421,
        lng: -103.29229,
        name: 'Doomsday Bunker',
        description: "Hurry, before it books up! Maybe it'll be your turn in the bunker when the end of the world strikes!",
        price: 299.99
      },
      {
        ownerId: 4,
        address: '42 Real Location Lane',
        city: 'Forest Grove',
        state: 'Oregon',
        country: 'USA',
        lat: 45.53783,
        lng: -123.1239,
        name: 'Space under the Erickson Home',
        description: 'Conveniently located in a popular neighborhood near a bustling shopping center. Dug out recently by a helpful family of skunks. Please note that we recommend that you have a very poor sense of smell if you intend to stay here.',
        price: 49.95
      },
      {
        ownerId: 5,
        address: 'Just go down the creepy stairs when you get to the gelato shop nearest to the Pantheon ',
        city: 'Rome',
        state: 'Rome',
        country: 'Italy',
        lat: 41.8993,
        lng: 12.4769,
        name: 'Roman Catacombs',
        description: 'Never feel alone again during your trip to Rome! Classic architecture with bone-chilling views of additional dark rooms.',
        price: 100
      },
      {
        ownerId: 5,
        address: 'Bayramli, Eski Cami Sk, 50700',
        city: 'Derinkuyu',
        state: 'NA',
        country: 'Turkey',
        lat: 38.3756,
        lng: 34.73329,
        name: 'Elengubu',
        description: 'You may need to go back in time a thousand years or so for ALL the comforts of home, but it will still keep you nice and dry should you wish to explore Turkey like a REAL archaeologist.',
        price: 99.99
      },
      {
        ownerId: 5,
        address: '720 52',
        city: 'Pshichro',
        state: 'Crete',
        country: 'Greece',
        lat: 35.16313,
        lng: 25.44545,
        name: 'Cave where Zeus was born',
        description: "Stay at the site of the great Zeus's birth!",
        price: 50
      },
      {
        ownerId: 5,
        address: 'Tombs of the Nobles, Unit 43',
        city: 'Luxor',
        state: 'NA',
        country: 'Egypt',
        lat: 25.73117,
        lng: 32.61074,
        name: "Unnamed Noble's Tomb",
        description: "Bring a fan, it gets hot in the Valley of the Kings! Enjoy relaxing in the pillaged remains of what once was an unknown Egyptian noble's resting spot.",
        price: 37
      },
      {
        ownerId: 5,
        address: 'Down the Grate off Kearney and 12th',
        city: 'Portland',
        state: 'Oregon',
        country: 'USA',
        lat: 45.52932,
        lng: -122.68051,
        name: 'Shanghai Tunnels',
        description: "Kidnappings in Portland via subterranean passageways are SO last century, don't worry!",
        price: 189.99
      },
      {
        ownerId: 7,
        address: 'Cave really far away from anything else of importance',
        city: 'Anogia',
        state: 'Crete',
        country: 'Greece',
        lat: 35.22444,
        lng: 24.8660,
        name: 'ACTUAL cave where Zeus was born',
        description: "Stay at the REAL site of the great Zeus's birth!",
        price: 55
      },
      {
        ownerId: 8,
        address: '501 Brandybuck Residence',
        city: 'Matamata',
        state: 'NA',
        country: 'New Zealand',
        lat: -37.87170,
        lng: 175.68500,
        name: 'Hobbit Hole 1',
        description: 'Evil ring not included.',
        price: 399.99
      },
      {
        ownerId: 8,
        address: '501 Baggins Residence',
        city: 'Matamata',
        state: 'NA',
        country: 'New Zealand',
        lat: -37.87170,
        lng: 175.68500,
        name: 'Hobbit Hole 2',
        description: 'Evil ring probably not included.',
        price: 499.99
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
