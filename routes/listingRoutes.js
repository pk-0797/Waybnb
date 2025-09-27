const express = require("express");
const router = express.Router();
const WrapAsync = require("../utils/WrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer = require("multer");
const { storage } = require("../CloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  .get(WrapAsync(listingController.getListing))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    WrapAsync(listingController.newListing)
  );

router.get("/new", isLoggedIn, listingController.newListingForm);

router
  .route("/:id")
  .put(
    isLoggedIn,
    isOwner,
    validateListing,
    WrapAsync(listingController.updateListing)
  )
  .delete(isLoggedIn, isOwner, WrapAsync(listingController.deleteListing))
  .get(WrapAsync(listingController.listingDetails));

router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  WrapAsync(listingController.editListing)
);

module.exports = router;
