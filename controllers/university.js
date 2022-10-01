const { connectDB } = require("../config/conDB");

//Get /student-uni
exports.listUniversity = async (req, res) => {
  try {
    const university = await connectDB("SELECT * FROM university");
    res.status(200).json(university);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
      msg: "Sever Error",
    });
  }
};

//Post /create-uni
exports.createUniversity = async (req, res) => {
  const { university } = req.body;
  if (!university) {
    return res.status(400).json({
      error: "Missing university",
    });
  }
  try {
    const university_have = await connectDB(
      `SELECT university FROM university WHERE university = ?`,
      [university]
    );
    if (university_have.length > 0) {
      return res.status(400).json({
        error: "university already exists",
      });
    } else {
      await connectDB(`INSERT INTO university VALUES(?,?)`, [null, university]);
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

//Put /edit-uni
exports.editUniversity = async (req, res) => {
  const { university, id } = req.body;
  if (!university || !id) {
    return res.status(400).json({
      error: "Missing university or id",
    });
  }
  try {
    const university_have = await connectDB(
      `SELECT university FROM university WHERE university = ?`,
      [university]
    );
    if (university_have.length > 0) {
      return res.status(400).json({
        error: "university already exists",
      });
    } else {
      await connectDB(`UPDATE university SET university = ? WHERE id = ?`, [
        university,
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

//delete /del-uni
exports.delUniversity = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({
      error: "Missing id",
    });
  }
  try {
    await connectDB(`DELETE FROM university WHERE id = ? `, [id]);
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
