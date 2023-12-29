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
        userId: 13,
        review: "This was such a cool experience! I had been wondering what it was like to live in my parents' basement! And there really  was only a *tiny* bit of mold. Hardly noticeable at all!",
        stars: 5
      },
      {
        spotId: 1,
        userId: 10,
        review: "...",
        stars: 2
      },
      {
        spotId: 1,
        userId: 12,
        review: "I went upstairs to use a PROPER restroom and was shooed away by the landlord! Absolutely the WORST service! I paid for this home, I should get to use it, not be stuck in the basement.",
        stars: 1
      },
      {
        spotId: 2,
        userId: 11,
        review: "What is this, icebnb? -eyeroll emoji-",
        stars: 3
      },
      {
        spotId: 2,
        userId: 13,
        review: "I don't know, does this really count as a ground dwelling? It's over ice.... sort of misleading, ngl. But it was still a good place to stay!",
        stars: 5
      },
      {
        spotId: 3,
        userId: 10,
        review: "....",
        stars: 1
      },
      {
        spotId: 3,
        userId: 13,
        review: "My child DID fit, it was great!",
        stars: 5
      },
      {
        spotId: 3,
        userId: 15,
        review: "Nice lack of view, but why would they insist on having guests sweep when we leave? The ground is dirt....",
        stars: 4
      },
      {
        spotId: 4,
        userId: 13,
        review: "It was so cool sharing this place with so many fluffy friends who wanted to cuddle!",
        stars: 5
      },
      {
        spotId: 5,
        userId: 10,
        review: "Such a cool place to stay. Great location, right in the center of a ton of cool attractions, and the wine cellar is amazing!",
        stars: 5
      },
      {
        spotId: 6,
        userId: 11,
        review: "Eh.",
        stars: 3
      },
      {
        spotId: 6,
        userId: 15,
        review: "I have PLAYED the Fallout games, and this is NOT a realistic shelter for being able to survive an apocalyptic situation. I mean, come on. What sort of doomsday bunker DOESN'T have a laboratory dedicated to finding the secrets to immortality?",
        stars: 2
      },
      {
        spotId: 7,
        userId: 1,
        review: "Smelled AWFUL. Not worth the money. I wish I had been warned about the stink before staying here....",
        stars:  1
      },
      {
        spotId: 8,
        userId: 10,
        review: ".....",
        stars: 2
      },
      {
        spotId: 8,
        userId: 12,
        review: "Stayed here for four nights, and I was SHOCKED when I discovered they had double booked the spot. I kept hearing voices felt cool breezes from fans, but the other occupants were really sneaky and it was a little disturbing.",
        stars: 1
      },
      {
        spotId: 10,
        userId: 10,
        review: "......",
        stars: 3
      },
      {
        spotId: 10,
        userId: 12,
        review: "I did not see a single Roman deity while I was here, and the owner of the spot refuses to give me a refund.",
        stars: 1
      },
      {
        spotId: 10,
        userId: 7,
        review: "omg this is not where zeus was born u liar scammer",
        stars: 1
      },
      {
        spotId: 11,
        userId: 1,
        review: "Fine, I guess, for what you are paying. ",
        stars: 4
      },
      {
        spotId: 11,
        userId: 13,
        review: "I never thought I would see what a desecrated tomb looked like in real life! Super cool.",
        stars: 5
      },
      {
        spotId: 12,
        userId: 10,
        review: ".......",
        stars: 3
      },
      {
        spotId: 13,
        userId: 5,
        review: "Yeah, definitely NOT the cave where Zeus came from. Laughable. Would give 0 stars if I could for false advertising.",
        stars: 1
      },
      {
        spotId: 13,
        userId: 11,
        review: "cool",
        stars: 4
      },
      {
        spotId: 14,
        userId: 10,
        review: "........",
        stars: 5
      },
      {
        spotId: 14,
        userId: 13,
        review: "A REAL HOBBIT HOLE. FROM LORD OF THE RINGS. IT IS SO COOL.",
        stars: 5
      },
      {
        spotId: 14,
        userId: 15,
        review: "I can tell this isn't a *real* hobbit hole, since I can stand upright in it and everything. Kinda ridiculous that they expect us to believe a smaller ancestry lived here. What, were they always on stilts?",
        stars: 2
      },
      {
        spotId: 15,
        userId: 12,
        review: "I paid for a legitimate Middle Earth experience, and there was not a single magical ring to be found in this home. Disappointing to say the least.",
        stars: 1
      },
      {
        spotId: 15,
        userId: 10,
        review: ".........",
        stars: 5
      },
      {
        spotId: 15,
        userId: 11,
        review: "No ring.",
        stars: 2
      },
      {
        spotId: 15,
        userId: 14,
        review: "lolol at these losers who expected the ring to just BE HERE. obvs it was already destroyed.",
        stars: 4
      },
    ], options, { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] }
    }, {});
  }
};
