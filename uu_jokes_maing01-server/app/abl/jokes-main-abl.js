"use strict";

const { LruCache } = require("uu_appg01_server").Utils;
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const { Profile, AppClientTokenService, UuAppWorkspace, UuAppWorkspaceError } = require("uu_appg01_server").Workspace;
const { UriBuilder } = require("uu_appg01_server").Uri;
const { LoggerFactory } = require("uu_appg01_server").Logging;
const { AppClient } = require("uu_appg01_server");
const Errors = require("../api/errors/jokes-main-error.js");
const Path = require("path");

const WARNINGS = {
  initUnsupportedKeys: {
    code: `${Errors.Init.UC_CODE}unsupportedKeys`
  },
  updateUnsupportedKeys: {
    code: `${Errors.Update.UC_CODE}unsupportedKeys`
  },
};

// const logger = LoggerFactory.get("JokesMainAbl");
const logger = LoggerFactory.get("JokesInstanceAbl");

const DEFAULT_NAME = "uuJokes";
const AUTHORITIES = "Authorities";
const EXECUTIVES = "Executives";
const STATE_ACTIVE = "active";
const STATE_UNDER_CONSTRUCTION = "underConstruction";
const STATE_CLOSED = "closed";

class JokesInstanceAbl {
  constructor() {
    this.validator = Validator.load();
    // TOCHANGE jokesInstance
    // this.dao = DaoFactory.getDao("jokesInstance");
    this.dao = DaoFactory.getDao("jokesMain");

    this.STATE_ACTIVE = STATE_ACTIVE;
    this.STATE_UNDER_CONSTRUCTION = STATE_UNDER_CONSTRUCTION;
    this.AUTHORITIES = AUTHORITIES;
    this.EXECUTIVES = EXECUTIVES;
  }

  async init(uri, dtoIn, session) {
    const awid = uri.getAwid();
    // hds 1
    let jokeInstance = await this.dao.getByAwid(awid);
    // A1
    if (jokeInstance) {
      throw new Errors.Init.JokesInstanceAlreadyInitialized();
    }

    // hds 2
    let validationResult = this.validator.validate("initDtoInType", dtoIn);
    // A2, A3
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.initUnsupportedKeys.code,
      Errors.Init.InvalidDtoIn
    );
    dtoIn.state = dtoIn.state || STATE_UNDER_CONSTRUCTION;
    dtoIn.name = dtoIn.name || DEFAULTS.name;
    dtoIn.awid = awid;

    // hds 3
    await Promise.all([
      this.dao.createSchema(),
      DaoFactory.getDao("joke").createSchema()
    ]);

    // hds 4
    try {
      jokeInstance = await this.dao.create(dtoIn);
    } catch (e) {
      // A4
      if (e instanceof ObjectStoreError) {
        throw new Errors.Init.JokesInstanceDaoCreateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }
    // hds 5 & 6 do not use
    // hds 7
    if (dtoIn.uuAppProfileAuthorities) {
      try {
        await SysProfileAbl.setProfile(awid, { code: AUTHORITIES, roleUri: dtoIn.uuAppProfileAuthorities });
      } catch (e) {
        // A7
        throw new Errors.Init.SysSetProfileFailed({ uuAppErrorMap }, { role: dtoIn.uuAppProfileAuthorities }, e);
      }
    }

    // hds 8
    jokeInstance.uuAppErrorMap = uuAppErrorMap;
    return jokeInstance;
  }
  async checkInstance(awid, notExistError, closedStateError) {
    let jokesInstance = await this.dao.getByAwid(awid);
    if (!jokesInstance) {
      throw new notExistError();
    }
    if (jokesInstance.state === STATE_CLOSED) {
      throw new closedStateError(
        {},
        {
          state: jokesInstance.state,
          expectedStateList: [STATE_ACTIVE, STATE_UNDER_CONSTRUCTION]
        }
      );
    }
    return jokesInstance;
  }
}

module.exports = new JokesInstanceAbl();
