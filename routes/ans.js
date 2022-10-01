const express = require("express");
const router = express.Router();

const { readAll, submitAll } = require("../controllers/ans");

router.get("/read-all", readAll);
router.post("/submit-all", submitAll);

module.exports = router;
