"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class JokesInstanceMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1 }, { unique: true });
  }

  async create(jokeInstance) {
    return await super.insertOne(jokeInstance);
  }

  async getByAwid(awid) {
    return await super.findOne({ awid });
  }

  async updateByAwid(jokeInstance) {
    return await super.findOneAndUpdate({ awid: jokeInstance.awid }, jokeInstance, "NONE");
  }
}

module.exports = JokesInstanceMongo;
