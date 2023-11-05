const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const {
  Spot,
  Review,
  SpotImage,
  User,
  ReviewImage,
  Booking,
} = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const review = require("../../db/models/review");
const router = express.Router();

// Get all Spots
router.get("/", async (req, res) => {
  let {page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice} = req.query;

  let query = {
    where: {},
    include:[]
  };

  page = parseInt(page);
  size = parseInt(size);
  if (!page) page = 1;
  if (!size) size= 20;

  if (page >= 1 && size >=1) {
    query.limit = 20;
    query.offset = size (page - 1)
  }

  let errors = {}

  if (page <= 1) {
    errors.page = "Page must be greater than or equal to 1"
  }

  if (size <= 1) {
    errors.size = "Size must be greater than or equal to 1"
  }

  if (minLat) {
    if (minLat > 90 || minLat < -90 || typeof minLat !== "number") {
      errors.minLat = "Minimum latitude is invalid";
    } else {
    query.where.lat >= minLat
    }
  }

  if (maxLat) {
    if (maxLat > 90 || maxLat < -90 || typeof maxLat !== "number") {
      errors.maxLat = "Maxiumum latitude is invalid";
    } else {
    query.where.lat <= maxLat
  }
}

  if (minLng) {
    if (minLng > 180 || minLng < -180 || typeof minLng !== "number") {
      errors.minLng = "Minimum longitude is invalid";
    }
    query.where.lng >= minLng
  }

  if (maxLng) {
    if (maxLng > 180 || maxLng < -180 || typeof maxLng !== "number") {
      errors.minLng = "Maximum longitude is invalid";
    }
    query.where.lng <= maxLng
  }

  if (minPrice) {
    if (minPrice < 1 || typeof price !== "number") {
      errors.minPrice = "Minimum price must be greater than or equal to 0";
    } else {
    query.where.minPrice >= minPrice
  }
}

  if (maxPrice) {
    if (maxPrice < 1 || typeof maxPrice !== "number") {
      errors.maxPrice = "Maximum price must be greater than or equal to 0";
    } else {
    query.where.maxPrice <= maxPrice
  }}

  if (Object.keys(errors).length !== 0) {
    const allErrors = {
      message: "Bad Request",
      errors: errors,
    };
   return res.status(400).json(allErrors);


  const spots = await Spot.findAll(query, {
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
}
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
    const currentUserSpots = {};
    currentUserSpots.Spots = spotList;

    res.json(currentUserSpots);
  } else {
    const errors = {};
    errors.message = "Authentication required";
    res.status(401).json(errors);
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

// Create a Spot
router.post("/", requireAuth, async (req, res) => {
  const { user } = req;
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  let errors = {};

  // console.log(req.body);
  if (address.length < 1) {
    errors.address = "Street address is required";
  }
  if (city.length < 1) {
    errors.city = "City is required";
  }
  if (state.length < 1) {
    errors.state = "State is required";
  }
  if (country.length < 1) {
    errors.country = "Country is required";
  }
  if (lat > 90 || lat < -90 || typeof lat !== "number") {
    errors.lat = "Latitude is not valid";
  }
  if (lng > 180 || lng < -180 || typeof lng !== "number") {
    errors.lng = "Longitude is not valid";
  }
  if (name.length > 50 || name.length < 1) {
    errors.name = "Name must be less than 50 characters";
  }
  if (description.length < 1) {
    errors.description = "Description is required";
  }
  if (price < 1 || typeof price !== "number") {
    errors.price = "Price per day is required";
  }

  if (Object.keys(errors).length !== 0) {
    const allErrors = {
      message: "Bad Request",
      errors: errors,
    };
    res.status(400).json(allErrors);
  } else {
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
  }
});

// Add an Image to a Spot based on the Spot's id
router.post("/:spotId/images", requireAuth, async (req, res) => {
  const { user } = req;
  const { url, preview } = req.body;

  const spot = await Spot.findByPk(req.params.spotId);
  if (!spot) {
    const err = new Error("Spot couldn't be found");
    res.status(404).json({
      message: err.message,
    });
  } else {
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
  }
});

//Edit a spot
router.put("/:spotId", requireAuth, async (req, res) => {
  const { user } = req;
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  const spotToChange = await Spot.findByPk(req.params.spotId);
  if (!spotToChange) {
    const err = new Error("Spot couldn't be found");
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

  if (address.length < 1) {
    errors.address = "Street address is required";
  } else {
    spotToChange.address = address;
  }
  if (city.length < 1) {
    errors.city = "City is required";
  } else {
    spotToChange.city = city;
  }
  if (state.length < 1) {
    errors.state = "State is required";
  } else {
    spotToChange.state = state;
  }
  if (country.length < 1) {
    errors.country = "Country is required";
  } else {
    spotToChange.country = country;
  }
  if (lat > 90 || lat < -90 || typeof lat !== "number") {
    errors.lat = "Latitude is not valid";
  } else {
    spotToChange.lat = lat;
  }
  if (lng > 180 || lng < -180 || typeof lng !== "number") {
    errors.lng = "Longitude is not valid";
  } else {
    spotToChange.lng = lng;
  }
  if (name.length > 50 || name.length < 1) {
    errors.name = "Name must be less than 50 characters";
  } else {
    spotToChange.name = name;
  }
  if (description.length < 1) {
    errors.description = "Description is required";
  } else {
    spotToChange.description = description;
  }
  if (price < 1 || typeof price !== "number") {
    errors.price = "Price per day is required";
  } else {
    spotToChange.price = price;
  }

  if (Object.keys(errors).length !== 0) {
    const allErrors = {
      message: "Bad Request",
      errors: errors,
    };
    res.status(400).json(allErrors);
  } else {
    // console.log(errors)
    await spotToChange.save();
    res.status(200).json(spotToChange);
  }
});

//Delete a spot
router.delete("/:spotId", requireAuth, async (req, res) => {
  const { user } = req;

  const spotToDelete = await Spot.findByPk(req.params.spotId);

  if (!spotToDelete) {
    const err = new Error("Spot couldn't be found");
    return res.status(404).json({ message: err.message });
  }

  if (spotToDelete.ownerId !== user.id) {
    const err = new Error("Forbidden");
    return res.status(403).json({
      message: err.message,
    });
  }

  await spotToDelete.destroy();
  res.status(200).json({
    message: "Successfully deleted",
  });
});

//Get all Reviews by a Spot's id
router.get("/:spotId/reviews", async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId);
  if (!spot) {
    const err = new Error("Spot couldn't be found");
    res.status(404).json({ message: err.message });
  } else {
    const reviews = await Review.findAll({
      where: { spotId: req.params.spotId },
      include: [
        { model: User, attributes: ["id", "firstName", "lastName"] },
        { model: ReviewImage, attributes: ["id", "url"] },
      ],
    });

    if (reviews.length === 0) {
      res.json("This spot has no reviews");
    } else {
      const spotIdReviews = {};
      spotIdReviews.Reviews = reviews;
      res.json(spotIdReviews);
    }
  }
});

//Create a Review for a Spot based on the Spot's id
router.post("/:spotId/reviews", requireAuth, async (req, res) => {
  const { user } = req;
  const { review, stars } = req.body;

  const spot = await Spot.findByPk(req.params.spotId);
  if (!spot) {
    const err = new Error("Spot couldn't be found");
    res.status(404).json({ message: err.message });
  } else {
    const oldReviews = await Review.findAll({
      where: { userId: user.id, spotId: spot.id },
    });

    if (oldReviews.length > 0) {
      const err = new Error("User already has a review for this spot");
      return res.status(500).json({ message: err.message });
    }

    let errors = {};

    if (review.length < 1) {
      errors.review = "Review text is required";
    }
    if (typeof stars !== "number" || stars > 5 || stars < 1) {
      errors.stars = "Stars must be an integer from 1 to 5";
    }

    if (Object.keys(errors).length !== 0) {
      const allErrors = {
        message: "Bad Request",
        errors: errors,
      };
      res.status(400).json(allErrors);
    } else {
      const newReview = await Review.create({
        spotId: req.params.spotId,
        userId: user.id,
        review,
        stars,
      });
      res.status(201).json(newReview);
    }
  }
});

//Get all Bookings for a Spot based on the Spot's id
router.get("/:spotId/bookings", requireAuth, async (req, res) => {
  const { user } = req;
  const spot = await Spot.findByPk(req.params.spotId);
  if (!spot) {
    const err = new Error("Spot couldn't be found");
    return res.status(404).json({ message: err.message });
  }

  if (spot.ownerId !== user.id) {
    const bookings = await Booking.findAll({
      where: { spotId: spot.id },
      attributes: ["spotId", "startDate", "endDate"],
    });
    const allBookings = {};
    allBookings.Bookings = bookings;
    res.status(200).json(allBookings);
  } else {
    const bookings = await Booking.findAll({
      where: { spotId: spot.id },
      include: [{ model: User, attributes: ["id", "firstName", "lastName"] }],
    });
    const allBookings = {};
    allBookings.Bookings = bookings;
    res.status(200).json(allBookings);
  }
});

//Create a Booking from a Spot based on the Spot's id
router.post("/:spotId/bookings", requireAuth, async (req, res) => {
  const { user } = req;
  const { startDate, endDate } = req.body;

  const spot = await Spot.findByPk(req.params.spotId);
  if (!spot) {
    const err = new Error("Spot couldn't be found");
    return res.status(404).json({ message: err.message });
  }
  if (spot.ownerId === user.id) {
    const err = new Error("Forbidden");
    return res.status(403).json({ message: err.message });
  }

  const start = new Date(startDate)
  const end = new Date(endDate)
  const startCheck = start.getTime()
  const endCheck = end.getTime()

  const checkOtherBookings = await Booking.findAll({
    where: { spotId: spot.id },
  });

  let errors = {};

  for (let booking of checkOtherBookings) {
    const priorStarts = new Date(booking.startDate);
    const priorStartCheck = priorStarts.getTime();
    const priorEnds = new Date(booking.endDate);
    const priorEndCheck = priorEnds.getTime();

    if (priorStartCheck <= startCheck && priorStartCheck <= priorEndCheck) {
      errors.startDate = "Start date conflicts with an existing booking";
    }

    if (priorStartCheck <= endCheck && endCheck <= priorEndCheck) {
      errors.endDate = "End date conflicts with an existing booking";
    }

    if (Object.keys(errors).length >= 2) {
      const allErrors = {
        message: "Sorry, this spot is already booked for the specified dates",
        errors: errors,
      };
      return res.status(403).json(allErrors);
    }
  }


  if (endCheck <= startCheck) {
    const err = new Error("endDate cannot be on or before startDate");
    return res.status(400).json({message: err.message})
  }

  const newBooking = await Booking.create({
    spotId: spot.id,
    userId: user.id,
    startDate,
    endDate
  })

  console.log(newBooking)

  res.status(200).json(newBooking)
});

module.exports = router;
