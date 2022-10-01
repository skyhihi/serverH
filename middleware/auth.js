const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  try {
    const token = req.headers["authtoken"]; //.ใน "" คือแล้วแต่จะตั้งชื่อ

    if (!token) {
      return res.status(401).send("No Token, authorization denied");
    }
    const decoded = jwt.verify(token, "jwtSecret");

    //console.log("middleware", decoded);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
      msg: "Token Invalid",
    });
  }
};
