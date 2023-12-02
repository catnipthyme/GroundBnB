const express = require("express");
const { Op } = require("sequelize");
const { requireAuth } = require("../../utils/auth");
const {
  Spot,
  SpotImage,
  Booking,
} = require("../../db/models");
const router = express.Router();

//Get all of the Current User's Bookings
router.get("/current", requireAuth, async (req, res) => {
  const { user } = req;

  const userBookings = await Booking.findAll({
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
        model: SpotImage,
      attributes: [
        "url",
        "preview"
      ]}
    ],
  });

  let withPreviewList = [];
  userBookings.forEach((booking) => {
    withPreviewList.push(booking.toJSON());
  });

if (Object.keys(SpotImage).length === 0) {
  Booking.Spot.previewImage = "No previews available"
} else {
  withPreviewList.forEach((booking) => {
    if (booking.SpotImage.preview === true) {
      booking.Spot.previewImage = booking.SpotImage.url
    }
    delete booking.SpotImage
  })
}




  const currentUserBookings = {};
  currentUserBookings.Bookings = withPreviewList;
  res.json(currentUserBookings);
});

//Delete a Booking
router.delete("/:bookingId", requireAuth, async (req, res) => {
  const { user } = req;

  const bookingToDelete = await Booking.findByPk(req.params.bookingId);

  if (!bookingToDelete) {
    const err = new Error("Booking couldn't be found");
    return res.status(404).json({ message: err.message });
  }

  if (bookingToDelete.userId !== user.id) {
    const err = new Error("Forbidden");
    return res.status(403).json({ message: err.message });
  }

  const start = new Date(bookingToDelete.startDate);
  const currently = new Date();

  const startCheck = start.getTime();
  const currentCheck = currently.getTime();

  if (currentCheck >= startCheck) {
    const err = new Error("Bookings that have been started can't be deleted");
    return res.status(403).json({ message: err.message });
  }

  await bookingToDelete.destroy();
  res.status(200).json({ message: "Successfully deleted" });
});

//Edit a Booking
router.put("/:bookingId", requireAuth, async (req, res) => {
  const { user } = req;
  const { startDate, endDate } = req.body;

  // check if the spot exists
  const bookingToChange = await Booking.findByPk(req.params.bookingId);
  if (!bookingToChange) {
    const err = new Error("Booking couldn't be found");
    return res.status(404).json({ message: err.message });
  }

  // check if the booking is owned by the current user
  if (bookingToChange.userId !== user.id) {
    const err = new Error("Forbidden");
    return res.status(403).json({
      message: err.message,
    });
  }

  // new requested dates
  const newStart = new Date(startDate).getTime();
  const newEnd = new Date(endDate).getTime();
  const current = new Date().getTime();
  const oldEnd = new Date(bookingToChange.endDate).getTime();

  if (current >= oldEnd) {
    const err = new Error("Past bookings can't be modified");
    return res.status(403).json({ message: err.message });
  }

  if (newEnd <= newStart) {
    const err = new Error("endDate cannot be on or before startDate");
    return res.status(400).json({ message: err.message });
  }

  // const bookingSpot = await Spot.findByPk(bookingToChange.spotId)
  const checkOtherBookings = await Booking.findAll({
    where: { id: { [Op.not]: bookingToChange.id},
  spotId: bookingToChange.spotId }
  })

  let errors = {};

  for (let booking of checkOtherBookings) {
    const otherStarts = new Date(booking.startDate).getTime();
    const otherEnds = new Date(booking.endDate).getTime();

    if (
      (otherStarts > newStart && otherStarts < newEnd) ||
      otherStarts === newStart ||
      otherEnds === newStart
    ) {
      errors.startDate = "Start date conflicts with an existing booking";
    }

    if (
      (otherStarts < newStart && otherEnds > newStart) ||
      (otherStarts < newEnd && otherEnds > newEnd) ||
      (otherStarts > newStart && otherEnds < newEnd)
    ) {
      errors.conflicts = "Sorry, this conflicts with another booking";
    }

    if (
      (otherStarts < newEnd && otherEnds > newEnd) ||
      otherStarts === newEnd ||
      otherEnds === newEnd
    ) {
      errors.endDate = "End date conflicts with an existing booking";
    }

    if (Object.keys(errors).length) {
      const allErrors = {
        message: "Sorry, this spot is already booked for the specified dates",
        errors: errors,
      };
      return res.status(403).json(allErrors);
    }
  }

  bookingToChange.startDate = startDate;
  bookingToChange.endDate = endDate;

  await bookingToChange.save();

  return res.status(200).json(bookingToChange);
});

module.exports = router;
