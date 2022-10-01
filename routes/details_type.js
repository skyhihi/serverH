const express = require("express");
const router = express.Router();

const {
  details_type,
  createDetail_type,
  deleteDetail_type,
  editDetail_type,
  details_typeID,
  editTitle_type,
  details_readID,
} = require("../controllers/details_type");

const { auth } = require("../middleware/auth");

router.get("/details-type", details_type);

router.post("/details-type-id", auth, details_typeID);

router.get("/details-type/:id", details_readID);

router.post("/createDetails-type", auth, createDetail_type);

router.delete("/deleteDetail-type:id", auth, deleteDetail_type);

router.put("/editTitle-type", auth, editTitle_type);

router.put("/editDetail-type", auth, editDetail_type);

module.exports = router;
