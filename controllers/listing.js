const Listing = require("../models/listings");

module.exports.getListing = async (req, res) => {
  let allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

module.exports.newListingForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.listingDetails = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", "The Listing You are looking for does not exist!");
    res.redirect("/listings");
  }
  res.render(`listings/show.ejs`, { listing });
};

module.exports.editListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "The Listing You are looking for does not exist!");
    res.redirect("/listings");
  }
  res.render("listings/edit.ejs", { listing });
};

module.exports.newListing = async (req, res) => {
  console.log("DEBUG newListing req.body:", req.body); 
  console.log("DEBUG newListing req.file:", req.file);
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  if (req.file) {
    newListing.image = {
      url: req.file.path,
      fileName: req.file.filename || req.file.originalname,
    };
  }
  await newListing.save();
  req.flash("success", "New Listing Created!");
  console.log(newListing);
  res.redirect("/listings");
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  req.flash("success", "Listing Updated Successfully!");
  res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted Successfully!");
  res.redirect("/listings");
};
