const mariadb = require("mariadb");

async function connectDB(conn_query, values = []) {
  const pool = mariadb.createPool({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "evaluate",
    port: 3306,
    //connectionLimit: process.env.connectionLimit,
  });
  const conn = await pool.getConnection();

  try {
    const results = await conn.query(conn_query, values);
    await conn.end();
    await pool.end();

    return results;
  } catch (e) {
    conn.end();
    pool.end();

    throw Error(e.message);
  }
}

module.exports = { connectDB };
