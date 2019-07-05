const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportConf = require("../config/passport");
const personnelController = require("../controllers").personnel;

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.post(
  "/personnel/login",
  passport.authenticate("local", { session: false }),
  personnelController.login
);

router.post("/personnel/signup", personnelController.signup);

module.exports = router;
