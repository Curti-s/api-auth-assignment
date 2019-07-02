const express = require("express");
const router = express.Router();

const personnelController = require("../controllers").personnel;

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/personnel/login", personnelController.login);
router.post("/personnel/signup", personnelController.signup);
module.exports = router;
