const mariadb = require("mariadb");

async function connectDB(conn_query, values = []) {
  const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    port: process.env.PORT_AWS,
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
