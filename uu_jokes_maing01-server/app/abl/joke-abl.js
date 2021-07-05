"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;

const Errors = require("../api/errors/joke-error.js");
const JokesInstanceAbl = require("./jokes-main-abl");

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`,
    message: "DtoIn CREATE contains unsupported keys.",
  },
  
  getUnsupportedKeys: {
    code: `${Errors.Get.UC_CODE}unsupportedKeys`,
    message: "DtoIn GET contains unsupported keys.",
  },
  
  updateUnsupportedKeys: {
    code: `${Errors.Update.UC_CODE}unsupportedKeys`,
    message: "DtoIn UPDATE contains unsupported keys.",
  },

  deleteUnsupportedKeys: {
    code: `${Errors.Delete.UC_CODE}unsupportedKeys`,
    message: "DtoIn DELETE contains unsupported keys.",
  },
  
  listUnsupportedKeys: {
    code: `${Errors.List.UC_CODE}unsupportedKeys`,
    message: "DtoIn LIST contains unsupported keys.",
  },
};

const DEFAULTS = {
  sortBy: "name",
  order: "asc",
  pageIndex: 0,
  pageSize: 100
};

class JokeAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("joke");
  }

  async create(awid, dtoIn, session, authorizationResult) {
    // hds 1, A1, hds 1.1, A2
    await JokesInstanceAbl.checkInstance(
      awid,
      Errors.Create.JokesInstanceDoesNotExist,
      Errors.Create.JokesInstanceNotInProperState
    );

    // hds 2, 2.1
    let validationResult = this.validator.validate("jokeCreateDtoInType", dtoIn);
    // hds 2.2, 2.3, A3, A4
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );
    // hds 2.4
    dtoIn.averageRating = 0;
    dtoIn.ratingCount = 0;
    dtoIn.visibility = authorizationResult.getAuthorizedProfiles().includes(JokesInstanceAbl.AUTHORITIES);
    dtoIn.uuIdentity = session.getIdentity().getUuIdentity();
    dtoIn.uuIdentityName = session.getIdentity().getName();
    dtoIn.awid = awid;

    // hds 3.1, A5, 3.2 - We will work with images later
    // hds 4, A7 - We don't work with the categories now

    // hds 5
    let joke;
    try {
      joke = await this.dao.create(dtoIn);
    } catch (e) {
      // A8
      if (e instanceof ObjectStoreError) {
        throw new Errors.Create.JokeDaoCreateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    // hds 6
    joke.uuAppErrorMap = uuAppErrorMap;
    return joke;
  }

  async get(awid, dtoIn, authorizationResult) {
    // hds 1, A1, hds 1.1, A2
    let jokesInstance = await JokesInstanceAbl.checkInstance(
      awid,
      Errors.Get.JokesInstanceDoesNotExist,
      Errors.Get.JokesInstanceNotInProperState
    );
    // A3
    let authorizedProfiles = authorizationResult.getAuthorizedProfiles();
    if (
      jokesInstance.state === JokesInstanceAbl.STATE_UNDER_CONSTRUCTION &&
      !authorizedProfiles.includes(JokesInstanceAbl.AUTHORITIES) &&
      !authorizedProfiles.includes(JokesInstanceAbl.EXECUTIVES)
    ) {
      throw new Errors.Get.JokesInstanceIsUnderConstruction({}, { state: jokesInstance.state });
    }

    // hds 2, 2.1
    let validationResult = this.validator.validate("jokeGetDtoInType", dtoIn);
    // hds 2.2, 2.3, A4, A5
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.getUnsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );

    // hds 3
    let joke = await this.dao.get(awid, dtoIn.id);
    if (!joke) {
      // A6
      throw new Errors.Get.JokeDoesNotExist(uuAppErrorMap, { jokeId: dtoIn.id });
    }

    // hds 4
    joke.uuAppErrorMap = uuAppErrorMap;
    return joke;
  }

  async update(awid, dtoIn, session, authorizationResult) {
    // hds 1, A1, hds 1.1, A2
    await JokesInstanceAbl.checkInstance(
      awid,
      Errors.Update.JokesInstanceDoesNotExist,
      Errors.Update.JokesInstanceNotInProperState
    );

    // hds 2, 2.1
    let validationResult = this.validator.validate("jokeUpdateDtoInType", dtoIn);
    // hds 2.2, 2.3, A3, A4
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.updateUnsupportedKeys.code,
      Errors.Update.InvalidDtoIn
    );

    // hds 3
    let joke = await this.dao.get(awid, dtoIn.id);
    // A5
    if (!joke) {
      throw new Errors.Update.JokeDoesNotExist({ uuAppErrorMap }, { jokeId: dtoIn.id });
    }

    // hds 4
    let uuId = session.getIdentity().getUuIdentity();
    // A6
    if (
      uuId !== joke.uuIdentity &&
      !authorizationResult.getAuthorizedProfiles().includes(JokesInstanceAbl.AUTHORITIES)
    ) {
      throw new Errors.Update.UserNotAuthorized({ uuAppErrorMap });
    }

    // hds 5
    if (dtoIn.categoryList) {
      let presentCategories = await this._checkCategoriesExistence(awid, dtoIn.categoryList);
      // A7
      if (dtoIn.categoryList.length > 0) {
        ValidationHelper.addWarning(
          uuAppErrorMap,
          WARNINGS.updateCategoryDoesNotExist.code,
          WARNINGS.updateCategoryDoesNotExist.message,
          { categoryList: [...new Set(dtoIn.categoryList)] }
        );
      }
      dtoIn.categoryList = [...new Set(presentCategories)];
    }

    // hds 6
    if (dtoIn.image) {
      let binary;
      if (!joke.image) {
        // hds 6.1
        try {
          binary = await UuBinaryAbl.createBinary(awid, { data: dtoIn.image });
        } catch (e) {
          // A8
          throw new Errors.Update.UuBinaryCreateFailed({ uuAppErrorMap }, e);
        }
      } else {
        // hds 6.2
        try {
          binary = await UuBinaryAbl.updateBinaryData(awid, {
            data: dtoIn.image,
            code: joke.image,
            revisionStrategy: "NONE"
          });
        } catch (e) {
          // A9
          throw new Errors.Update.UuBinaryUpdateBinaryDataFailed({ uuAppErrorMap }, e);
        }
      }
      dtoIn.image = binary.code;
    }

    // hds 7
    try {
      dtoIn.awid = awid;
      joke = await this.dao.update(dtoIn);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        // A10
        throw new Errors.Update.JokeDaoUpdateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    // hds 8
    joke.uuAppErrorMap = uuAppErrorMap;
    return joke;
  }

  async delete(awid, dtoIn, session, authorizationResult) {
    // hds 1, A1, hds 1.1, A2
    await JokesInstanceAbl.checkInstance(
      awid,
      Errors.Delete.JokesInstanceDoesNotExist,
      Errors.Delete.JokesInstanceNotInProperState
    );

    // hds 2, 2.1
    let validationResult = this.validator.validate("jokeDeleteDtoInType", dtoIn);
    // hds 2.2, 2.3, A3, A4
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.deleteUnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn
    );

    // hds 3
    let joke = await this.dao.get(awid, dtoIn.id);
    // A5
    if (!joke) {
      throw new Errors.Delete.JokeDoesNotExist({ uuAppErrorMap }, { jokeId: dtoIn.id });
    }

    // hds 4, A6
    if (
      session.getIdentity().getUuIdentity() !== joke.uuIdentity &&
      !authorizationResult.getAuthorizedProfiles().includes(JokesInstanceAbl.AUTHORITIES)
    ) {
      throw new Errors.Delete.UserNotAuthorized({ uuAppErrorMap });
    }

    // hds 5, hds 6 - We don't work with ratings and images

    // hds 7
    await this.dao.delete(awid, dtoIn.id);

    // hds 8
    return { uuAppErrorMap };
  }
  async list(awid, dtoIn, authorizationResult) {
    // hds 1, A1, hds 1.1, A2
    let jokesInstance = await JokesInstanceAbl.checkInstance(
      awid,
      Errors.List.JokesInstanceDoesNotExist,
      Errors.List.JokesInstanceNotInProperState
    );
    // A3
    let authorizedProfiles = authorizationResult.getAuthorizedProfiles();
    if (
      jokesInstance.state === JokesInstanceAbl.STATE_UNDER_CONSTRUCTION &&
      !authorizedProfiles.includes(JokesInstanceAbl.AUTHORITIES) &&
      !authorizedProfiles.includes(JokesInstanceAbl.EXECUTIVES)
    ) {
      throw new Errors.List.JokesInstanceIsUnderConstruction({}, { state: jokesInstance.state });
    }

    // hds 2, 2.1
    let validationResult = this.validator.validate("jokeListDtoInType", dtoIn);
    // hds 2.2, 2.3, A4, A5
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.listUnsupportedKeys.code,
      Errors.List.InvalidDtoIn
    );
    // hds 2.4
    if (!dtoIn.sortBy) dtoIn.sortBy = DEFAULTS.sortBy;
    if (!dtoIn.order) dtoIn.order = DEFAULTS.order;
    if (!dtoIn.pageInfo) dtoIn.pageInfo = {};
    if (!dtoIn.pageInfo.pageSize) dtoIn.pageInfo.pageSize = DEFAULTS.pageSize;
    if (!dtoIn.pageInfo.pageIndex) dtoIn.pageInfo.pageIndex = DEFAULTS.pageIndex;

    // hds 3
    let list;
    if (dtoIn.categoryList) {
      list = await this.dao.listByCategoryIdList(awid, dtoIn.categoryList, dtoIn.sortBy, dtoIn.order, dtoIn.pageInfo);
    } else {
      list = await this.dao.list(awid, dtoIn.sortBy, dtoIn.order, dtoIn.pageInfo);
    }

    // hds 4
    list.uuAppErrorMap = uuAppErrorMap;
    return list;
  }
}

module.exports = new JokeAbl();
