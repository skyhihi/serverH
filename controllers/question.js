const { connectDB } = require("../config/conDB");

//Get /questions
exports.listQuestions = async (req, res) => {
  try {
    const question = await connectDB(
      "SELECT question.*,  type.name,type.type_sym FROM question INNER JOIN type ON question.type_id = type.type_id"
    );
    res.status(200).json(question);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
      msg: "Sever Error",
    });
  }
};

//Get read-question
exports.readQuestions = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({
      error: "Missing id",
    });
  }
  try {
    const question = await connectDB(`SELECT * FROM question WHERE id = ?`, [
      id,
    ]);
    res.status(200).json(question[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
      msg: "Sever Error",
    });
  }
};

//Post create-question
exports.create = async (req, res) => {
  const { detail, type_id } = req.body;
  if (!detail || !type_id) {
    return res.status(400).json({
      error: "Missing detail or type_id",
    });
  }
  try {
    const question_have = await connectDB(
      `SELECT detail FROM question WHERE detail = ?`,
      [detail]
    );
    if (question_have.length > 0) {
      return res.status(400).json({
        error: "Question already exists",
      });
    } else {
      const insert = await connectDB(`INSERT INTO question VALUES(?,?,?,?)`, [
        null,
        detail,
        type_id,
        "unenable",
      ]);

      /*
      const select = await connectDB(
        `SELECT * FROM question WHERE detail = ?`,
        [detail]
      );
      let id = select[0].id;
      const create = await connectDB(
        `ALTER TABLE ans_all ADD qaId_? int(1) NOT NULL`,
        [id]
      );
      */

      await res.status(200).json({
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

//Put change-question
exports.editQuestion = async (req, res) => {
  const { id, detail } = req.body;
  if (!detail || !id) {
    return res.status(401).json({
      error: "Missing id or detail",
    });
  }
  try {
    const question_have = await connectDB(
      `SELECT detail FROM question WHERE detail = ?`,
      [detail]
    );
    if (question_have.length > 0) {
      return res.status(400).json({
        error: "Question already exists",
      });
    } else {
      await connectDB(`UPDATE question SET detail = ? WHERE id = ?`, [
        detail,
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

//Put change-question-type
exports.editQuesType = async (req, res) => {
  const { id, type_id } = req.body;
  if (!id || !type_id) {
    return res.status(401).json({
      error: "Missing id or type_id",
    });
  }
  try {
    await connectDB(`UPDATE question SET type_id = ? WHERE id = ?`, [
      type_id,
      id,
    ]);
    res.status(200).json({
      status: "update success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
      msg: "Sever Error",
    });
  }
};

//Put change-question-status
exports.editQueStutus = async (req, res) => {
  const { id, status } = req.body;
  if (!id || !status) {
    return res.status(401).json({
      error: "Missing id or status",
    });
  }
  try {
    await connectDB(`UPDATE question SET status = ? WHERE id = ?`, [
      status,
      id,
    ]);
    res.status(200).json({
      status: "update success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
      msg: "Sever Error",
    });
  }
};

//Delete del-question
exports.deleteQuestion = async (req, res) => {
  const id = req.params.id;
  let qaId = parseInt(id);
  if (!id) {
    return res.status(401).json({
      error: "Missing id",
    });
  }

  try {
    /*
    const drop = await connectDB(
      `ALTER TABLE ans_all
      DROP COLUMN qaId_?`,
      [qaId]
    );
    */

    const del = await connectDB(`DELETE FROM question WHERE id = ?`, [id]);

    await res.status(200).json({
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
