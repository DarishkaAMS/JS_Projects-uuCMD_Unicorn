"use strict";

const { UuObjectDao } = require("uu_appg01_server").ObjectStore;
const { ObjectId } = require("bson");
const { DbConnection } = require("uu_appg01_datastore");

class JokeMongo extends UuObjectDao {
  async createSchema() {
    // await super.createIndex({ awid: 1, _id: 1 }, { unique: true });
    // await super.createIndex({ awid: 1, categoryList: 1 });
  }

  async create(uuObject) {
    return await super.insertOne(uuObject);
  }

  async get(awid, id) {
    return await super.findOne({ id, awid });
  }

  async update(uuObject) {
    const {id, awid} =uuObject
    return super.findOneAndUpdate({ awid, id },uuObject );
  }

  async delete(awid, id) {
    await super.deleteOne({ awid, id });
  }

  async list(awid, pageInfo) {
    return super.find({ awid }, pageInfo);
  }
}

module.exports = JokeMongo;
