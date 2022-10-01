const express = require("express");
const router = express.Router();

const { readAns, submitAns } = require("../controllers/ans_all");

router.get("/read-ans", readAns);
router.post("/submit-ans", submitAns);

module.exports = router;
