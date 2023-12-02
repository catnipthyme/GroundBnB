const express = require("express");
const { requireAuth } = require("../../utils/auth");
const {
  Spot,
  Review,
  SpotImage,
  User,
  ReviewImage,
} = require("../../db/models");
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
        model: User,
        attributes: [
          "id",
          "firstName",
          "lastName"
        ],
      },
      {
        model: ReviewImage,
        attributes: ["id", "url"],
      },
      {
        model: SpotImage,
        attributes: [
          "preview",
          "url"
        ]
      }
    ],
  });

  let reviewsList = [];
  reviews.forEach((review) => {
    reviewsList.push(review.toJSON());
  })

  if (Object.keys(SpotImage).length === 0) {
    Review.Spot.previewImage = "No previews available"
  } else {
    reviewsList.forEach((review) => {
      if (review.SpotImage.preview === true) {
        review.Spot.previewImage = review.SpotImage.url
      }
      delete review.SpotImage
    })
  }

  const currentUserReviews = {};
  currentUserReviews.Reviews = reviewsList;
  return res.json(currentUserReviews);
});


//Add an Image to a Review based on the Review's id
router.post("/:reviewId/images", requireAuth, async(req, res) => {
  const {user} = req;
  const {url} = req.body;


  const review = await Review.findByPk(req.params.reviewId)
  if (!review) {
    const err = new Error("Review couldn't be found");
    return res.status(404).json({message: err.message});
  } else {
    if (review.userId !== user.id) {
      const err = new Error("Forbidden");
      return res.status(403).json({message: err.message});
    }

    const reviewImages = await ReviewImage.findAll({
      where: {reviewId: review.id}
    })
    if (reviewImages.length === 10) {
      const err = new Error("Maximum number of images for this resource was reached");
      return res.status(403).json({message: err.message})
    } else {

    const newReviewImage = await ReviewImage.create({
      reviewId: review.id,
      url
    });

    const responseImage = {
      id: newReviewImage.id,
      url: newReviewImage.url,
    }

  return res.status(200).json(responseImage)
  }
  }
})

router.put("/:reviewId", requireAuth, async(req, res) => {
  const {user} = req;
  const {review, stars} = req.body;

  const reviewToChange = await Review.findByPk(req.params.reviewId);
  if (!reviewToChange) {
    const err = new Error("Review couldn't be found");
    return res.status(404).json({message: err.message})
  };

  if (reviewToChange.userId !== user.id) {
    const err = new Error("Forbidden");
    return res.status(403).json({message: err.message})
  }

  let errors = {};

  if (review.length < 1) {
    errors.review = "Review text is required";
  } else {
    reviewToChange.review = review;
  }
  if (typeof stars !== "number" || stars > 5 || stars < 1) {
    errors.stars = "Stars must be an integer from 1 to 5"
  } else {
    reviewToChange.stars = stars
  }
  if (Object.keys(errors).length !== 0) {
    const allErrors = {
      message: "Bad Request",
      errors: errors
    }
    return res.status(400).json(allErrors)
  } else {
    await reviewToChange.save();
    return res.status(200).json(reviewToChange)
  }

})

//Delete a Review
router.delete("/:reviewId", requireAuth, async(req, res) => {
  const {user} = req;

  const reviewToDelete = await Review.findByPk(req.params.reviewId);

  if (!reviewToDelete) {
    const err = new Error ("Review couldn't be found");
    return res.status(404).json({message: err.message})
  }

  if (reviewToDelete.userId !== user.id) {
    const err = new Error("Forbidden");
    return res.status(403).json({
      message: err.message,
    });
  }

  await reviewToDelete.destroy();
  return res.status(200).json({message: "Successfully deleted"})
})

module.exports = router;
