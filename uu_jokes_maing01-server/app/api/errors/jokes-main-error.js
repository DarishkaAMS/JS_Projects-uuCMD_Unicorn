"use strict";
const UuJokesError = require("./jokes-main-use-case-error.js");
const JOKES_INSTANCE_ERROR_PREFIX = `${UuJokesError.ERROR_PREFIX}jokesInstance/`;

const Init = {
  UC_CODE: `${JOKES_INSTANCE_ERROR_PREFIX}init/`,
  JokesInstanceAlreadyInitialized: class extends UuJokesError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}jokesInstanceAlreadyInitialized`;
      this.message = "JokesInstance is already initialized.";
    }
  },
  InvalidDtoIn: class extends UuJokesError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  CreateAwscFailed: class extends UuJokesError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}createAwscFailed`;
      this.message = "Create uuAwsc failed.";
    }
  },
  SysSetProfileFailed: class extends UuJokesError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}sys/setProfileFailed`;
      this.message = "Create uuAppProfile failed.";
    }
  },
  JokesInstanceDaoCreateFailed: class extends UuJokesError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}jokesInstanceDaoCreateFailed`;
      this.message = "Create jokesInstance by jokesInstance DAO create failed.";
    }
  }
};

module.exports = {
  Init,
};
