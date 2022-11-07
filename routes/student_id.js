const express = require("express");
const router = express.Router();

const {
  listStudentId,
  createStudent,
  delStudent,
  checkStudent,
} = require("../controllers/student_id");

router.get("/list-student-id", listStudentId);
router.post("/create-student", createStudent);
router.delete("/del-student", delStudent);
router.post("/check-student-id", checkStudent);

module.exports = router;
