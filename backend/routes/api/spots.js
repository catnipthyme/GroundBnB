const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Spot, Review, SpotImage, User } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const review = require("../../db/models/review");
const router = express.Router();

// Get all Spots
router.get("/", async (req, res) => {
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

// Get all Spots owned by the Current User
router.get("/current", requireAuth, async (req, res) => {
  const { user } = req;

  if (!user) {
    const err = new Error("Authentication required");
    err.title = "Authentication required";
    err.errors = { message: "Authentication required" };
    err.status = 401;
    res.status(401).json(err);
  }

  const userSpots = await Spot.findAll({
    where: { ownerId: user.id },
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
    res.json("Current user has no spots.");
  }

  res.json(spotList);
});

// Get details of a Spot from an id
router.get("/:spotId", async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId, {
    include: [
      { model: SpotImage, attributes: ["id", "url", "preview"] },
      { model: User, attributes: ["id", "firstName", "lastName"] },
      { model: Review },
    ],
  });

  if (!spot) {
    const err = new Error("Spot couldn't be found.");
    res.status(404).json({
      message: err.message,
    });
  }

  selectedSpot = spot.toJSON();
  const reviews = selectedSpot.Reviews;
  const numReviews = reviews.length;
  let totalStars = 0;
  reviews.forEach((review) => {
    totalStars += review.stars;
  });
  if (!review.length) {
    (selectedSpot.avgRating = "No reviews available"),
      (selectedSpot.numReviews = "No reviews available");
    delete selectedSpot.Reviews;
  } else {
    selectedSpot.avgRating = totalStars / numReviews;
    selectedSpot.numReviews = numReviews;
    delete selectedSpot.Reviews;
  }

  selectedSpot.Owner = {
    id: 2,
    firstName: "Demoni",
    lastName: "Userni",
  };

  delete selectedSpot.User;

  res.json(selectedSpot);
});

module.exports = router;
