const express = require("express");
const router = express.Router();

//import controllers
const { delYear } = require("../controllers/year");
const { auth } = require("../middleware/auth");

router.delete("/delete-year/:id", auth, delYear);

module.exports = router;
