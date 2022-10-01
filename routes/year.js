const express = require("express");
const router = express.Router();

//import controllers
const {
  listYears,
  createYear,
  editYear,
  delYear,
} = require("../controllers/year");
const { auth } = require("../middleware/auth");

router.get("/student-years", listYears);
router.post("/create-year", auth, createYear);
router.delete("/delete-year/:id", auth, delYear);
router.put("/edit-year", auth, editYear);

module.exports = router;
