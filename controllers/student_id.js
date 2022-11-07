const { connectDB } = require("../config/conDB");

//get /list-student-id
exports.listStudentId = async (req, res) => {
  try {
    const list = await connectDB(`SELECT * FROM student_id`);
    res.status(200).json(list);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
      msg: "Sever Error",
    });
  }
};

//post /create-student
exports.createStudent = async (req, res) => {
  const { id } = req.body;
  try {
    await connectDB(`INSERT INTO student_id values (?)`, [id]);
    res.status(200).json({
      status: "create success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
      msg: "Sever Error",
    });
  }
};

//post /check-student-id
exports.checkStudent = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(401).json({
      error: "Invalid Student ID",
    });
  }
  try {
    const student_have = await connectDB(
      `SELECT id FROM student_id WHERE id = ?`,
      [id]
    );
    if (student_have.length > 0) {
      return res.status(200).json({
        status: "pass",
      });
    } else {
      return res.status(400).json({
        status: "Undefined Student ID",
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

//get /del-student
exports.delStudent = async (req, res) => {
  try {
    await connectDB(`DELETE FROM student_id;`);
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
