const express = require("express");
const router = express.Router();
const connectDB = require("../config/conDB");

//import controllers
const {
  listUsers,
  updateUsers,
  readUser,
  changeRole,
  deleteUsers,
} = require("../controllers/users");

//middleware
const { auth } = require("../middleware/auth");

const { registerUsers, login, currentUser } = require("../controllers/auth");

router.get("/users", auth, listUsers);

router.post("/read-user", auth, readUser);

router.delete("/delete-user/:id", auth, deleteUsers);

router.post("/register", auth, registerUsers);

router.put("/change-role", auth, changeRole);

router.post("/login", login);

router.post("/current-user", auth, currentUser);

module.exports = router;
