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

//Delete a Review Image
router.delete("/:imageId", requireAuth, async (req, res) => {
  const { user } = req;

  const reviewImgToDelete = await ReviewImage.findByPk(req.params.imageId);

  if (!reviewImgToDelete) {
    const err = new Error("Review Image couldn't be found");
    return res.status(404).json({ message: err.message });
  }

  const relatedReview = await Review.findOne({
    where: { id: reviewImgToDelete.reviewId },
  });

  if (relatedReview.userId !== user.id) {
    const err = new Error("Forbidden");
    return res.status(403).json({
      message: err.message,
    });
  }

  await reviewImgToDelete.destroy();
  res.status(200).json({ message: "Successfully deleted" });
});

module.exports = router;
