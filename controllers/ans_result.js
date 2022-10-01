const { connectDB } = require("../config/conDB");

//Get /read-ans-result
exports.readAnsRs = async (req, res) => {
  try {
    const ansRs = await connectDB("SELECT result FROM submit_result");
    res.status(200).json(ansRs);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
      msg: "Sever Error",
    });
  }
};
//Post /submit-ansRs
exports.submitAnsRs = async (req, res) => {
  const result = req.body;
  try {
    const insertRs = await connectDB(`INSERT INTO submit_result VALUES (?)`, [
      result,
    ]);
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
