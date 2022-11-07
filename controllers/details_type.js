const { connectDB } = require("../config/conDB");

exports.details_type = async (req, res) => {
  try {
    const details_type = await connectDB(
      "SELECT details_type.detail_id, details_type.title, details_type.details, details_type.type_id as details_t_id,type.type_id,type.name,type.type_sym FROM details_type INNER JOIN type ON details_type.type_id=type.type_id;"
    );
    res.status(200).json(details_type);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
      msg: "Sever Error",
    });
  }
};

exports.details_typeID = async (req, res) => {
  const { type_id } = req.body;
  if (!type_id) {
    return res.status(401).json({
      error: "Missing type_id",
    });
  }
  try {
    const details_type = await connectDB(
      "SELECT details_type.detail_id, details_type.title, details_type.details, details_type.type_id,type.name FROM details_type INNER JOIN type ON details_type.type_id=type.type_id WHERE type.type_id = ? ;",
      [type_id]
    );
    res.status(200).json(details_type);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
      msg: "Sever Error",
    });
  }
};

exports.details_readID = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(401).json({
      error: "Missing id",
    });
  }
  try {
    const details_type = await connectDB(
      "SELECT details_type.detail_id, details_type.title, details_type.details, details_type.type_id,type.name FROM details_type INNER JOIN type ON details_type.type_id=type.type_id WHERE type.type_id = ? ;",
      [id]
    );
    res.status(200).json(details_type);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
      msg: "Sever Error",
    });
  }
};

exports.createDetail_type = async (req, res) => {
  const { title, details, type_id } = req.body;
  if (!title || !details || !type_id) {
    return res.status(400).json({
      error: "You need to add title or details or type_id",
    });
  }
  try {
    await connectDB(`INSERT INTO details_type VALUES (?,?,?,?)`, [
      null,
      title,
      details,
      type_id,
    ]);
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

exports.deleteDetail_type = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({
      error: "Missing detail_id",
    });
  }
  try {
    await connectDB(`DELETE FROM details_type WHERE detail_id = ? `, [id]);
    res.status(200).json({
      status: "this details has been delete",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
      msg: "Sever Error",
    });
  }
};

//Put editTitle-type
exports.editTitle_type = async (req, res) => {
  const { detail_id, title } = req.body;
  if (!detail_id || !title) {
    return res.status(400).json({
      error: "Missing detail_id or title",
    });
  }
  try {
    await connectDB(`UPDATE details_type SET title = ? WHERE detail_id = ?`, [
      title,
      detail_id,
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

//Put editDetail-type
exports.editDetail_type = async (req, res) => {
  const { detail_id, details } = req.body;
  if (!detail_id || !details) {
    return res.status(400).json({
      error: "Missing detail_id or details",
    });
  }
  try {
    await connectDB(`UPDATE details_type SET details = ? WHERE detail_id = ?`, [
      details,
      detail_id,
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
