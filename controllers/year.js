const { connectDB } = require("../config/conDB");

//Get /student-years
exports.listYears = async (req, res) => {
  try {
    const years = await connectDB("SELECT * FROM year");
    res.status(200).json(years);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
      msg: "Sever Error",
    });
  }
};

//Post /create-year
exports.createYear = async (req, res) => {
  const { year } = req.body;
  if (!year) {
    return res.status(400).json({
      error: "Missing year",
    });
  }
  try {
    const year_have = await connectDB(`SELECT year FROM year WHERE year = ?`, [
      year,
    ]);
    if (year_have.length > 0) {
      return res.status(400).json({
        error: "Year already exists",
      });
    } else {
      await connectDB(`INSERT INTO year VALUES(?,?)`, [null, year]);
      res.status(200).json({
        status: "create success",
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

//Put /edit-year
exports.editYear = async (req, res) => {
  const { year, id } = req.body;
  if (!year || !id) {
    return res.status(400).json({
      error: "Missing year or id",
    });
  }
  try {
    const year_have = await connectDB(`SELECT year FROM year WHERE year = ?`, [
      year,
    ]);
    if (year_have.length > 0) {
      return res.status(400).json({
        error: "Year already exists",
      });
    } else {
      await connectDB(`UPDATE year SET year = ? WHERE id = ?`, [year, id]);
      res.status(200).json({
        status: "update success",
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

//Delete /del-yaer
exports.delYear = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({
      error: "Missing id",
    });
  }
  try {
    await connectDB(`DELETE FROM year WHERE id = ? `, [id]);
    res.status(200).json({
      status: "delete success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
      msg: "Sever Error",
    });
  }
};
