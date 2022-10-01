const { connectDB } = require("../config/conDB");

exports.type = async (req, res) => {
  try {
    const type = await connectDB("SELECT * FROM type");
    res.status(200).json(type);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
      msg: "Sever Error",
    });
  }
};

exports.create_type = async (req, res) => {
  const { name, type_sym } = req.body;
  if (!name || !type_sym) {
    return res.status(400).json({
      error: "You need to insert type name or type_sym",
    });
  }

  try {
    const name_have = await connectDB(`SELECT name FROM type WHERE name = ?`, [
      name,
    ]);
    if (name_have.length > 0) {
      return res.status(400).json({
        error: "Type already exists",
      });
    } else {
      const insert = await connectDB(`INSERT INTO type VALUES (?,?,?)`, [
        null,
        name,
        type_sym,
      ]);
      /*    const select = await connectDB(`SELECT * FROM type WHERE name = ?`, [
        name,
      ]);
      let id = select[0].type_id;
      const create = await connectDB(
        `ALTER TABLE ans_result ADD typeId_? int(1) NOT NULL`,
        [id]
      );
*/
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

exports.delete_type = async (req, res) => {
  const id = req.params.id;
  let typeId = parseInt(id);
  if (!id) {
    return res.status(401).json({
      error: "Missing id",
    });
  }
  try {
    /*
    const drop = await connectDB(
      `ALTER TABLE ans_result
      DROP COLUMN typeId_?`,
      [typeId]
    );
    */
    const del = await connectDB(`DELETE FROM type WHERE type_id = ? `, [id]);
    res.status(200).json({
      status: "type has been delete",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
      msg: "Sever Error",
    });
  }
};

//Put edit_typeName
exports.edit_typeName = async (req, res) => {
  const { type_id, name } = req.body;
  if (!name || !type_id) {
    return res.status(400).json({
      error: "You need to insert type_id or name",
    });
  }
  try {
    await connectDB(`UPDATE type SET name = ? WHERE type_id = ?`, [
      name,
      type_id,
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

//Put edit_typeSym
exports.edit_typeSym = async (req, res) => {
  const { type_id, symbol } = req.body;
  if (!symbol || !type_id) {
    return res.status(400).json({
      error: "You need to insert type_id or symbol",
    });
  }
  try {
    await connectDB(`UPDATE type SET type_sym = ? WHERE type_id = ?`, [
      symbol,
      type_id,
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
