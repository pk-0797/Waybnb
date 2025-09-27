const User = require("../models/user");

module.exports.getLoginForm = (req, res) => {
  res.render("user/login.ejs");
};

module.exports.getSignUpForm = (req, res) => {
  res.render("user/signup.ejs");
};

module.exports.login = async (req, res) => {
  req.flash("success", "Welcome to Waybnb! You are logged in!");
  let URL = res.locals.redirectUrl || "/listings";
  res.redirect(URL);
};

module.exports.signup = async (req, res) => {
  try {
    let { email, username, password } = req.body;
    let newUser = new User({ email, username });
    let savedUser = await User.register(newUser, password);
    console.log(savedUser);
    req.login(savedUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "user saved successfully");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      next(err);
    }
    req.flash("success", "you are logged out");
    res.redirect("/listings");
  });
};
