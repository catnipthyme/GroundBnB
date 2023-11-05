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

//Delete a Booking
router.delete("/:bookingId", requireAuth, async(req, res) => {
  const {user} = req;

  const bookingToDelete = await Booking.findByPk(req.params.bookingId);

  if (!bookingToDelete) {
    const err = new Error("Booking couldn't be found");
    return res.status(404).json({message: err.message})
  }

  if (bookingToDelete.userId !== user.id) {
    const err = new Error("Forbidden");
    return res.status(403).json({message: err.message})
  }

  await bookingToDelete.destroy();
  res.status(200).json({message: "Successfully deleted"})
})


module.exports = router;
