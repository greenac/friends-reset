'use strict';


const Pool = require('pg-pool');


const params = {
  username: 'andre',
  database: 'andre',
  host: 'localhost',
  port: '5432',
  idleTimeoutMillis: 1000,
  connectionTimeoutMillis: 100000
};

const pool = new Pool(params);

/**
 * Executes a query.
 *
 * @param {String} query
 * @param {Array} values
 * @param {Boolean} shouldDisconnect
 * @returns {Promise.<*>}
 */
module.exports.query = async (query, values, shouldDisconnect=false) => {
  const connection = await pool.connect();
  try {
    return await connection.query(query, values, shouldDisconnect);
  } catch (error) {
    console.log('Failed to make query:', query, 'Error:', error);
    throw error;
  } finally {
    connection.release();
  }
};

/**
 * Removes pull from the database.
 *
 * @returns {Promise.<void>}
 */
module.exports.disconnect = async () => {
  try {
    await pool.end();
    console.log('disconnected from postgres pool');
  } catch (error) {
    throw error;
  }
};
