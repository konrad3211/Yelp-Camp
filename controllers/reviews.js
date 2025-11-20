const Review = require("../modules/review")
const Campground = require("../modules/campground")

module.exports.createReview = async (req, res) => {
    const { id } = req.params
    const campground = await Campground.findById(id)
    const review = new Review(req.body.review)
    campground.reviews.push(review);
    review.author = req.user._id
    await review.save()
    await campground.save()
    req.flash("success", "Successfully add a review")
    res.redirect(`/campgrounds/${campground._id}`)
}


module.exports.deleteReview = async (req, res) => {
    const { id } = req.params
    const { reviewId } = req.params
    const camp = await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } }) //to usuwa review z campground
    const rev = await Review.findByIdAndDelete(reviewId)
    req.flash("success", "Successfully removed a review")
    res.redirect(`/campgrounds/${id}`)
}


