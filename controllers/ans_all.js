const { connectDB } = require("../config/conDB");

//Get /read-ans
exports.readAns = async (req, res) => {
  try {
    const ans = await connectDB("SELECT ans FROM submit_ans");
    res.status(200).json(ans);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
      msg: "Sever Error",
    });
  }
};

//Post /submit-ans
exports.submitAns = async (req, res) => {
  const ans = req.body;
  try {
    const insert = await connectDB(`INSERT INTO submit_ans VALUES (?)`, [ans]);

    res.status(200).json({
      status: "insert success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
      msg: "Sever Error",
    });
  }
};
