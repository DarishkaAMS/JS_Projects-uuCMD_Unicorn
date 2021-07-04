"use strict";

const { UuObjectDao } = require("uu_appg01_server").ObjectStore;
// const { ObjectId } = require("bson");
// const { DbConnection } = require("uu_appg01_datastore");

class JokeMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1, _id: 1 }, { unique: true });
    await super.createIndex({ awid: 1, categoryList: 1 });
  }

  async create(uuObject) {
    if (uuObject.categoryList) {
      uuObject.categoryList = uuObject.categoryList.map(categoryId => new ObjectId(categoryId));
    }
    return await super.insertOne(uuObject);
  }

  async get(awid, id) {
    return await super.findOne({ id, awid });
  }

  // async getCountByCategoryId(awid, categoryId) {
  //   return await super.count({
  //     awid,
  //     categoryList: ObjectId.isValid(categoryId) ? new ObjectId(categoryId) : categoryId
  //   });
  // }

  async update(uuObject) {
    if (uuObject.categoryList) {
      uuObject.categoryList = uuObject.categoryList.map(categoryId => new ObjectId(categoryId));
    }
    let filter = {
      id: uuObject.id,
      awid: uuObject.awid
    };
    return await super.findOneAndUpdate(filter, uuObject, "NONE");
  }

  async updateVisibility(awid, id, visibility) {
    return await this.update({ awid, id, visibility });
  }

  // async removeCategory(awid, categoryId) {
  //   let db = await DbConnection.get(this.customUri);
  //   await db
  //     .collection(this.collectionName)
  //     .updateMany(
  //       { awid },
  //       { $pull: { categoryList: ObjectId.isValid(categoryId) ? new ObjectId(categoryId) : categoryId } }
  //     );
  // }

  async delete(awid, id) {
    await super.deleteOne({ awid, id });
  }

  async list(awid, sortBy, order, pageInfo) {
    let sort = {
      [sortBy]: order === "asc" ? 1 : -1
    };
    return await super.find({ awid }, pageInfo, sort);
  }

  // async listByCategoryIdList(awid, categoryIdList, sortBy, order, pageInfo) {
  //   let sort = {
  //     [sortBy]: order === "asc" ? 1 : -1
  //   };
  //   return await super.find(
  //     {
  //       awid,
  //       categoryList: {
  //         $in: categoryIdList.map(id => {
  //           if (!ObjectId.isValid(id)) return id;
  //           return new ObjectId(id);
  //         })
  //       }
  //     },
  //     pageInfo,
  //     sort
  //   );
  // }
}

module.exports = JokeMongo;
