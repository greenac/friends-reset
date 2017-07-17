'use strict';

const db = require('./db');


class Query {
  /**
   * Initializes query object.
   *
   * @param {String} query
   * @param {Array} values
   */
  constructor(query, values) {
    this._query = query;
    this._values = values;
  };

  /**
   * Sets the query string.
   *
   * @param {String} query
   */
  setQuery(query) {
    this._query = query;
  };

  /**
   * Sets the values for a given query string.
   *
   * @param {Array} values
   */
  setValues(values) {
    this._values = values;
  };

  setParams(query, values) {
    this._query = query;
    this._values = values;
  };

  /**
   * Executes the query.
   *
   * @param {Boolean} killPool
   * @returns {Promise}
   */
  execute(killPool=false) {
    return new Promise((resolve, reject) => {
      this._execute(killPool).then((result) => {
        resolve(result)
      }, (error) => {
        reject(error);
      });
    });
  };

  /**
   * Helper function to asynchronously executes the query.
   *
   * @param {Boolean} killPool
   * @returns {Promise.<*>}
   * @private
   */
  async _execute(killPool) {
    let result;
    try {
      result = await this._makeQuery();
    } catch (error) {
      throw error;
    }

    if (killPool) {
      try {
        await db.disconnect();
      } catch (error) {
        console.log('Error: failed to kill pool:', error);
      }
    }

    return result;
  };

  /**
   * Queries the db.
   *
   * @returns {Promise}
   * @private
   */
  _makeQuery() {
    return new Promise((resolve, reject) => {
      db.query(this._query, this._values).then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      });
    });
  };
}

module.exports = Query;
