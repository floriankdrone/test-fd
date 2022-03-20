const db = require('../clients/db');
const errors = require('../clients/errors');

class Records {
  /**
   * Model constructor
   */
  constructor() {
    this.db = db;
    this.collection = 'records';
  }

  /**
   * Fetch data from db
   * @param {Date} startDate
   * @param {Date} endDate
   * @param {Number} minCount
   * @param {Number} maxCount
   * @returns {Object} databse payload
   * @throws
   */
  async fetch(startDate, endDate, minCount, maxCount) {
    let records;
    try {
      records = await this.db.fetch(
        this.collection,
        startDate,
        endDate,
        minCount,
        maxCount,
      );
    } catch (error) {
      console.log('Failed to fetch records from db', error);
      return errors.internalError;
    }
    return {
      code: 0,
      msg: 'Success',
      records: records.map(({ key, createdAt, totalCount }) => ({
        key,
        createdAt,
        totalCount,
      })),
    };
  }
}

module.exports = new Records();
