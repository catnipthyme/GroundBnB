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
const spotimage = require("../../db/models/spotimage");
const booking = require("../../db/models/booking");
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
  // console.log("NEVER")
  Booking.Spot.previewImage = "No previews available"
} else {
  // console.log("Yo")
  withPreviewList.forEach((booking) => {
    // console.log("Hello")
    if (booking.SpotImage.preview === true) {
      // console.log("sigh")
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

//Edit a Booking TAKE TWO



// //Edit a Booking
// router.put("/:bookingId", requireAuth, async (req, res) => {
//   const { user } = req;
//   const { startDate, endDate } = req.body;

//   const bookingToChange = await Booking.findByPk(req.params.bookingId);
//   if (!bookingToChange) {
//     const err = new Error("Booking couldn't be found");
//     return res.status(404).json({ message: err.message });
//   }

//   if (bookingToChange.userId !== user.id) {
//     const err = new Error("Forbidden");
//     return res.status(403).json({
//       message: err.message,
//     });
//   }

//   const start = new Date(startDate);
//   const end = new Date(endDate);
//   const current = new Date();

//   const startCheck = start.getTime();
//   const endCheck = end.getTime();
//   const nowCheck = current.getTime();

//   if (nowCheck >= endCheck) {
//     const err = new Error("Past bookings can't be modified");
//     return res.status(403).json({ message: err.message });
//   }

//   const checkOtherBookings = await Booking.findAll({
//     where: { spotId: bookingToChange.spotId },
//   });

//   let errors = {};

//   for (let booking of checkOtherBookings) {
//     const priorStarts = new Date(booking.startDate);
//     const priorStartCheck = priorStarts.getTime();
//     const priorEnds = new Date(booking.endDate);
//     const priorEndCheck = priorEnds.getTime();

//     if (priorStartCheck <= startCheck && priorStartCheck <= priorEndCheck) {
//       errors.startDate = "Start date conflicts with an existing booking";
//     }

//     if (priorStartCheck <= endCheck && endCheck <= priorEndCheck) {
//       errors.endDate = "End date conflicts with an existing booking";
//     }

//     if (Object.keys(errors).length >= 2) {
//       const allErrors = {
//         message: "Sorry, this spot is already booked for the specified dates",
//         errors: errors,
//       };
//       return res.status(403).json(allErrors);
//     }
//   }


//   if (endCheck <= startCheck) {
//     const err = new Error("endDate cannot be on or before startDate");
//     return res.status(400).json({ message: err.message });
//   }
//   bookingToChange.startDate = startDate;
//   bookingToChange.endDate = endDate

//   await bookingToChange.save();

//   res.status(200).json(bookingToChange);
// });

module.exports = router;
