const { connectDB } = require("../config/conDB");
var bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Post register
exports.registerUsers = async (req, res) => {
  const { name, username, password } = req.body;

  if (!username || !password || !name) {
    return res.status(400).json({
      error: "Missing username or name or password",
    });
  }

  try {
    const username_have = await connectDB(
      `SELECT username FROM user WHERE username = ?`,
      [username]
    );
    if (username_have.length > 0) {
      return res.status(400).json({
        error: "Username already exists",
      });
    }

    bcrypt
      .hash(password, parseInt(process.env.SALT_ROUNDS))
      .then(async function (hashedPassword) {
        await connectDB(`INSERT INTO user VALUES(?,?,?,?,?)`, [
          null,
          name,
          username,
          hashedPassword,
          "user",
        ]);
      });

    res.status(200).json({
      status: "success",
      message: "create success",
    });
  } catch (err) {
    //ดักจับ error
    console.log(err); //log บอกว่ามี error อะไร
    res.status(500).json({
      error: err,
      msg: "Sever Error",
    }); //ส่งไปหน้าบ้าน
  }
};

//POST login
exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(401).json({
      error: "Invalid username or password",
    });
  }
  try {
    const username_have = await connectDB(
      "SELECT username FROM user WHERE username = ?",
      [username]
    );
    if (username_have.length == 0) {
      res.status(401).json({
        error: "undefined user",
      });
    } else {
      const pw = await connectDB(
        "SELECT password FROM user WHERE username = ?",
        [username]
      );

      bcrypt.compare(password, pw[0].password).then(async function (result) {
        const user = await connectDB(
          "SELECT name,username,role FROM user WHERE username = ?",
          [username]
        );
        const payload = {
          user: {
            name: user[0].name,
            username: user[0].username,
            role: user[0].role,
          },
        };

        if (result) {
          jwt.sign(payload, "jwtSecret", { expiresIn: "30d" }, (err, token) => {
            if (err) throw err;
            res.status(200).json({
              token,
              payload,
              status: "success",
              message: "User logged in",
            });
          });
        } else {
          return res.status(400).json({
            error: "Password Invalid",
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
      msg: "Sever Error",
    });
  }
};

//POST currentUser
exports.currentUser = async (req, res) => {
  const username = req.user.username;

  try {
    const user = await connectDB(
      `SELECT name , username , role FROM user WHERE username = ?`,
      [username]
    );
    res.send(user[0]);
    console.log("user", user[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
      msg: "Sever Error",
    });
  }
};
