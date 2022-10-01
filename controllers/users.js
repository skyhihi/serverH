const { connectDB } = require("../config/conDB");
var bcrypt = require("bcrypt");

//Get users
exports.listUsers = async (req, res) => {
  try {
    const user = await connectDB(
      "SELECT id, name , username , role FROM user;"
    );

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
      msg: "Sever Error",
    });
  }
};

//================================================//

//Post read-user
exports.readUser = async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({
      error: "Missing username",
    });
  }
  try {
    const user = await connectDB(
      `SELECT name , username , role FROM user WHERE username = ?`,
      [username]
    );
    res.status(200).json(user[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
      msg: "Sever Error",
    });
  }
};

//================================================//

//Put change-role
exports.changeRole = async (req, res) => {
  const { username, role } = req.body;
  if (!username || !role) {
    return res.status(400).json({
      error: "Missing id or username or role",
    });
  }
  try {
    await connectDB(`UPDATE user SET role = ? WHERE username = ?`, [
      role,
      username,
    ]);
    res.status(200).json({
      status: "update success",
      msg: username + " change role",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
      msg: "Sever Error",
    });
  }
};

//================================================//

//Delete
exports.deleteUsers = async (req, res) => {
  const id = req.params.id;
  let UserId = parseInt(id);
  if (!id) {
    return res.status(400).json({
      error: "Missing username",
    });
  }
  try {
    await connectDB(`DELETE FROM user WHERE id = ? `, [id]);
    res.status(200).json({
      status: "user has been delete",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
      msg: "Sever Error",
    });
  }
};

//================================================//
