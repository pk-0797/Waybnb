const express = require("express");
const router = express.Router({ mergeParams: true });
const Listing = require("../models/listings.js");
const Review = require("../models/Review.js");
const WrapAsync = require("../utils/WrapAsync.js");
const { isLoggedIn, isAuthor, validateReview } = require("../middleware.js");
const reviewController = require("../controllers/review.js");

router.post(
  "/",
  isLoggedIn,
  validateReview,
  WrapAsync(reviewController.newReview)
);

router.delete("/:reviewId", isAuthor, reviewController.deleteReview);

module.exports = router;
