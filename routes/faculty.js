const express = require("express");
const router = express.Router();

const {
  listFaculty,
  createFaculty,
  editFaculty,
  delFaculty,
} = require("../controllers/faculty");
const { auth } = require("../middleware/auth");

router.get("/student-faculty", listFaculty);

router.post("/create-faculty", auth,createFaculty);

router.put("/edit-faculty", auth,editFaculty);

router.delete("/del-faculty/:id", auth,delFaculty);

module.exports = router;
