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

    spot.avgRating = totalStars / reviewCount;

    if (!reviews.length) {
      spot.avgRating = "No reviews available";
    }

    delete spot.Reviews;
  });

  let Spots = spotList;

  res.json({ Spots });
});

// Get all Spots owned by the Current User
router.get("/current", requireAuth, async (req, res) => {
  const { user } = req;

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

    spot.avgRating = totalStars / reviewCount;
    if (reviews.length === 0) {
      spot.avgRating = "No reviews available";
    }
    delete spot.Reviews;
  });

  if (spotList.length > 0) {
    const currentUserSpots = {}
    currentUserSpots.Spots = spotList

    res.json(currentUserSpots)
  } else {
    const errors = {}
    errors.message = "Authentication required"
  res.status(401).json(errors)
}
});

// Get details of a Spot from an id
router.get("/:spotId", async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId, {
    include: [
      { model: SpotImage, attributes: ["id", "url", "preview"] },
      { model: User, as: "Owner", attributes: ["id", "firstName", "lastName"] },
      { model: Review },
    ],
  });

  if (!spot) {
    const err = new Error("Spot couldn't be found");
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
  selectedSpot.avgRating = totalStars / numReviews;
  selectedSpot.numReviews = numReviews;
  if (reviews.length === 0) {
    selectedSpot.avgRating = "No reviews available";
    selectedSpot.numReviews = "No reviews available";
  }
  delete selectedSpot.Reviews;

  delete selectedSpot.User;

  res.json(selectedSpot);
});

const validateSpot = [
  check("address")
    .exists({ checkFalsy: true })
    .withMessage("Street address is required"),
  check("city").exists({ checkFalsy: true }).withMessage("City is required"),
  check("state").exists({ checkFalsy: true }).withMessage("State is required"),
  check("country")
    .exists({ checkFalsy: true })
    .withMessage("Country is required"),
  check("lat")
    .exists({ checkFalsy: true })
    .withMessage("Latitude is not valid"),
  check("lng")
    .exists({ checkFalsy: true })
    .withMessage("Longitude is not valid"),
  check("name")
    .exists({ checkFalsy: true })
    .withMessage("Name must be less than 50 characters"),
  check("description")
    .exists({ checkFalsy: true })
    .withMessage("Description is required"),
  check("price")
    .exists({ checkFalsy: true })
    .withMessage("Price per day is required"),
  handleValidationErrors,
];

// Create a Spot
router.post("/", requireAuth, validateSpot, async (req, res) => {
  const { user } = req;
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  const newSpot = await Spot.create({
    ownerId: user.id,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  });

  res.status(201).json(newSpot);
});

// Add an Image to a Spot based on the Spot's id
router.post("/:spotId/images", requireAuth, async (req, res) => {
  const { user } = req;
  const { url, preview } = req.body;

  const spot = await Spot.findByPk(req.params.spotId);
  if (!spot) {
    const err = new Error("Spot couldn't be found.");
    res.status(404).json({
      message: err.message,
    });
  }

  if (spot.ownerId !== user.id) {
    const err = new Error("Forbidden");
    res.status(403).json({
      message: err.message,
    });
  }

  const newImage = await SpotImage.create({
    spotId: spot.id,
    url,
    preview,
  });


  res.status(200).json(newImage);
});

router.put("/:spotId", requireAuth, async (req, res) => {
  const { user } = req;
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  const spotToChange = await Spot.findByPk(req.params.spotId);
  if (!spotToChange) {
    const err = new Error("Spot couldn't be found.");
    res.status(404).json({
      message: err.message,
    });
  }

  if (spotToChange.ownerId !== user.id) {
    const err = new Error("Forbidden");
    res.status(403).json({
      message: err.message,
    });
  }

  let errors = {};

  console.log(req.body);
  if (address.length < 1) {
    errors.address = "Street address is required"
  } else {
    spotToChange.address = address;
  }
  if (city.length < 1) {
    errors.city = "City is required"
  } else {
    spotToChange.city = city;
  }
  if (state.length < 1) {
    errors.state = "State is required"
  } else {
    spotToChange.state = state;
  }
  if (country.length < 1) {
    errors.country = "Country is required"
  } else {
    spotToChange.country = country;
  }
  if (lat > 90 || lat < -90 || typeof lat !== "number") {
    errors.lat = "Latitude is not valid"
  } else {
    spotToChange.lat = lat
  }
if (lng > 180 || lng < -180 || typeof lng !== "number") {
      errors.lng = "Longitude is not valid"
    } else {
    spotToChange.lng = lng;
  }
    if (name.length > 50 || name.length < 1) {
      errors.name = "Name must be less than 50 characters"
    } else {
    spotToChange.name = name;
  }
    if (description.length < 1) {
      errors.description = "Description is required"
    } else {
    spotToChange.description = description;
  }
    if (price < 1 || typeof price !== "number") {
      errors.price = "Price per day is required"
    } else {
    spotToChange.price = price;
  }

  if (Object.keys(errors).length !== 0) {
    const allErrors = {
      "message": "Bad Request",
      "errors": errors
    }
    res.status(400).json(allErrors);
  } else {
    // console.log(errors)
    await spotToChange.save();
    res.status(200).json(spotToChange);
  }
});

module.exports = router;
