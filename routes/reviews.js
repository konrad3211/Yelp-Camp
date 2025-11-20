const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync")
const Review = require("../modules/review")
const Campground = require("../modules/campground")
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware");
const { createReview, deleteReview } = require("../controllers/reviews");

router.post("/", isLoggedIn, validateReview, catchAsync(createReview))

router.delete("/:reviewId", isLoggedIn, isReviewAuthor, catchAsync(deleteReview))

module.exports = router;