const express = require("express");
const router = express.Router();

const { readAnsRs, submitAnsRs } = require("../controllers/ans_result");

router.get("/read-ansRs", readAnsRs);
router.post("/submit-ansRs", submitAnsRs);

module.exports = router;
