const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Spot, Review, SpotImage, User } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const review = require("../../db/models/review");
const router = express.Router();


router.get("/", async(req, res) => {
  const spots = await Spot.findAll({
    include: [
      {
        model: SpotImage,
      },
      {
        model: Review,
      },
    ],
  });

  let spotList = [];
  spots.forEach((spot) => {
    spotList.push(spot.toJSON());
  });

  spotList.forEach((spot) => {
    spot.SpotImages.forEach((image) => {
      if (image.preview === true) {
        spot.previewImage = image.url;
      }
    });
    if (!spot.previewImage) {
      spot.previewImage = "No previews available";
    }
    delete spot.SpotImages;

    const reviews = spot.Reviews;
    const reviewCount = reviews.length;
    let totalStars = 0;
    reviews.forEach((review) => {
      totalStars += review.stars;
    });
    if (!review.length) {
      spot.avgRating = "No reviews available";
    }
    spot.avgRating = totalStars / reviewCount;
    delete spot.Reviews;
  });

  res.json({ spotList });
});

router.get("/current", requireAuth, async(req, res) => {
  const {user} = req

  if (!user) {
    const err = new Error('Authentication required');
    err.title = 'Authentication required';
    err.errors = {message: 'Authentication required'};
    err.status = 401;
    res.status(401).json(err)
  }

  const userSpots = await Spot.findAll({
    where: {ownerId: user.id},
    include: [
      {
        model: SpotImage,
      },
      {
        model: Review,
      }
    ]
  })

  let spotList = [];
  userSpots.forEach((spot) => {
    spotList.push(spot.toJSON());
  });

  spotList.forEach((spot) => {
    spot.SpotImages.forEach((image) => {
      if (image.preview === true) {
        spot.previewImage = image.url;
      }
    });
    if (!spot.previewImage) {
      spot.previewImage = "No previews available";
    }
    delete spot.SpotImages;

    const reviews = spot.Reviews;
    const reviewCount = reviews.length;
    let totalStars = 0;
    reviews.forEach((review) => {
      totalStars += review.stars;
    });
    if (!review.length) {
      spot.avgRating = "No reviews available";
    }
    spot.avgRating = totalStars / reviewCount;
    delete spot.Reviews;
  });

  if (spotList.length === 0) {
    res.json("Current user has no spots.")
  }

  res.json(spotList)

})

module.exports = router;
