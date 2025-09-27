const express = require("express");
const router = express.Router();
const WrapAsync = require("../utils/WrapAsync.js");
const Passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/user.js");

router
  .route("/login")
  .get(userController.getLoginForm)
  .post(
    saveRedirectUrl,
    Passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.login
  );

router
  .route("/signup")
  .get(userController.getSignUpForm)
  .post(WrapAsync(userController.signup));

router.get("/logout", userController.logout);

module.exports = router;
