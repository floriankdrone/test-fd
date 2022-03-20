const mongo = require('mongodb').MongoClient;

class Db {
  /**
   * Constructo
   */
  constructor() {
    this.url = 'mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getir-case-study?retryWrites=true';
  }

  /**
   * Connect to mongo server
   * @param {Function} callback function to be called once mongo server connection has been done
   */
  connect(callback) {
    mongo.connect(this.url, { useNewUrlParser: true }, (err, client) => {
      if (err) {
        console.error(err);
        return;
      }
      this.db = client.db('getir-case-study');
      callback();
    });
  }

  /**
   * Fetch data from db
   * @param {String} collection
   * @param {Date} startDate
   * @param {Date} endDate
   * @param {Number} minCount
   * @param {Number} maxCount
   * @returns {Object} databse payload
   * @throws
   */
  async fetch(collection, startDate, endDate, minCount, maxCount) {
    const mongoCollection = this.db.collection(collection);

    try {
      const data = await mongoCollection
        .aggregate([
          { $project: { key: true, createdAt: true, totalCount: { $sum: '$counts' } } },
          {
            $match: {
              totalCount: {
                $gt: minCount,
                $lt: maxCount,
              },
              createdAt: {
                $gt: startDate,
                $lt: endDate,
              },
            },
          },
        ])
        .toArray();
      return data;
    } catch (error) {
      console.log('🚀 ~ file: db.js ~ line 52 ~ Db ~ fetch ~ error', error);
      throw error;
    }
  }
}

module.exports = new Db();
