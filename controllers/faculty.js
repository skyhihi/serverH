const { connectDB } = require("../config/conDB");

exports.listFaculty = async (req, res) => {
  try {
    const faculty = await connectDB("SELECT * FROM faculty");
    res.status(200).json(faculty);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
      msg: "Sever Error",
    });
  }
};

//Post /create-faculty
exports.createFaculty = async (req, res) => {
  const { faculty } = req.body;
  if (!faculty) {
    return res.status(400).json({
      error: "Missing faculty",
    });
  }
  try {
    const faculty_have = await connectDB(
      `SELECT faculty FROM faculty WHERE faculty = ?`,
      [faculty]
    );
    if (faculty_have.length > 0) {
      return res.status(400).json({
        error: "Faculty already exists",
      });
    } else {
      await connectDB(`INSERT INTO faculty VALUES(?,?)`, [null, faculty]);
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

exports.editFaculty = async (req, res) => {
  const { faculty, id } = req.body;
  if (!faculty || !id) {
    return res.status(400).json({
      error: "Missing faculty or id",
    });
  }
  try {
    const faculty_have = await connectDB(
      `SELECT faculty FROM faculty WHERE faculty = ?`,
      [faculty]
    );
    if (faculty_have.length > 0) {
      return res.status(400).json({
        error: "faculty already exists",
      });
    } else {
      await connectDB(`UPDATE faculty SET faculty = ? WHERE id = ?`, [
        faculty,
        id,
      ]);
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

exports.delFaculty = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({
      error: "Missing id",
    });
  }
  try {
    await connectDB(`DELETE FROM faculty WHERE id = ? `, [id]);
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
