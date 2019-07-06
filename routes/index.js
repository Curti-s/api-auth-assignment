const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportConf = require("../config/passport");
const personnelController = require("../controllers").personnel;
const taskController = require("../controllers").task;

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/personnel/signup", personnelController.signup);
router.post(
  "/personnel/login",
  passport.authenticate("local", { session: false }, function(
    error,
    user,
    info
  ) {
    // this will execute in any case, even if a passport strategy will find an error
    // log everything to console
    console.log(error);
    console.log(user);
    console.log(info);
  }),
  personnelController.login
);
router.get(
  "/tasks/assigned",
  passport.authenticate("jwt", { session: false }),
  taskController.tasks
);

module.exports = router;
