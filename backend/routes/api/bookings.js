const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const review = require("../../db/models/review");
const router = express.Router();

//Get all of the Current User's Bookings
router.get("/current", requireAuth, async(req, res) => {
  const {user} = req;



  const userBookings = await Booking.findAll({
    where: {userId: user.id},
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
    ]
  });

  const currentUserBookings = {};
  currentUserBookings.Bookings = userBookings;
  res.json(currentUserBookings)


})


module.exports = router;
