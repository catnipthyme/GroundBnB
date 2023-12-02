const express = require("express");
const { requireAuth } = require("../../utils/auth");
const {
  Spot,
  SpotImage
} = require("../../db/models");
const router = express.Router();

//Delete a Spot Image
router.delete("/:imageId", requireAuth, async(req, res) => {
  const {user} = req;

  const imageToDelete = await SpotImage.scope("deleteImage").findByPk(req.params.imageId, {
    include: [
      {model: Spot, attributes: ["ownerId"]}
    ]
  });


  if (!imageToDelete) {
    const err = new Error("Spot Image couldn't be found");
    return res.status(404).json({message: err.message});
  };

  if (imageToDelete.Spot.ownerId !== user.id) {
    const err = new Error("Forbidden");
    res.status(403).json({message:err.message})
  } else {
    await imageToDelete.destroy();
    res.status(200).json({message: "Successfully deleted"})
  }

});


module.exports = router;
