const express = require("express");
const router = express.Router();

const {
  type,
  create_type,
  delete_type,
  edit_typeSym,
  edit_typeName,
} = require("../controllers/type");
const { auth } = require("../middleware/auth");

router.get("/type", type);

router.post("/create-type", auth, create_type);

router.delete("/delete-type/:id", auth, delete_type);

router.put("/edit-typeName", auth, edit_typeName);

router.put("/edit-typeSym", auth, edit_typeSym);

module.exports = router;
