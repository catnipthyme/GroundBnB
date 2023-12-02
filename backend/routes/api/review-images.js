const express = require("express");
const { requireAuth } = require("../../utils/auth");
const {
  Review,
  ReviewImage,
} = require("../../db/models");
const router = express.Router();

//Delete a Review Image
router.delete("/:imageId", requireAuth, async (req, res) => {
  const { user } = req;

  const reviewImgToDelete = await ReviewImage.findByPk(req.params.imageId, {
    include: [{ model: Review, attributes: ["userId"] }],
  });

  if (!reviewImgToDelete) {
    const err = new Error("Review Image couldn't be found");
    return res.status(404).json({ message: err.message });
  }

  if (reviewImgToDelete.Review.userId !== user.id) {
    const err = new Error("Forbidden");
    return res.status(403).json({
      message: err.message,
    });
  }

  await reviewImgToDelete.destroy();
  res.status(200).json({ message: "Successfully deleted" });
});

module.exports = router;
