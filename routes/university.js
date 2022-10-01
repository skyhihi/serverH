const express = require("express");
const router = express.Router();

//import controllers
const {
  listUniversity,
  createUniversity,
  editUniversity,
  delUniversity,
} = require("../controllers/university");
const { auth } = require("../middleware/auth");

router.get("/student-uni", listUniversity);

router.post("/create-uni", auth,createUniversity);

router.put("/edit-uni", auth,editUniversity);

router.delete("/del-uni/:id", auth,delUniversity);

module.exports = router;
