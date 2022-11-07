const { connectDB } = require("../config/conDB");

//Get /read-all
exports.readAll = async (req, res) => {
  try {
    const all = await connectDB("SELECT all_ans FROM ans_all");
    res.status(200).json(all);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
      msg: "Sever Error",
    });
  }
};

//Post /submit-all
exports.submitAll = async (req, res) => {
  const all = req.body;
  try {
    const insert = await connectDB(`INSERT INTO ans_all VALUES (?)`, [all]);

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

exports.deleteAllData = async (req, res) => {
  try {
    await connectDB(`DELETE FROM ans_all`);
    res.status(200).json({
      status: "delete success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Sever Error",
      msg: err,
    });
  }
};
