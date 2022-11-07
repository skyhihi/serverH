const express = require("express");
const router = express.Router();

const { readAll, submitAll, deleteAllData } = require("../controllers/ans");

router.get("/read-all", readAll);
router.post("/submit-all", submitAll);
router.delete("/delete-all", deleteAllData);

module.exports = router;
