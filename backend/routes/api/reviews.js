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

//Get all Reviews of the Current User
router.get("/current", requireAuth, async (req, res) => {
  const { user } = req;

  const reviews = await Review.findAll({
    where: { userId: user.id },
    include: [
      {
        model: Spot,
        attributes: [
          "id",
          "ownerId",
          "address",
          "city",
          "state",
          "country",
          "lat",
          "lng",
          "name",
          "price",
        ],
      },
      {
        model: ReviewImage,
        attributes: ["id", "url"],
      },
      {
        model: SpotImage,
      },
    ],
  });

  let reviewList = [];
  reviews.forEach((review) => {
    reviewList.push(review.toJSON());
  });

  reviewList.forEach((review) => {
    if (image.preview === true) {
      review.previewImage = image.url;
    }
    if (!image.previewImage) {
      review.previewImage = "No previews available";
    }
  });

  delete spot.SpotImages;

  const currentUserReviews = {};
  currentUserReviews.Reviews = reviewList;
  res.json(currentUserReviews);
});

module.exports = router;
