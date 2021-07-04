"use strict";
const { UseCaseError } = require("uu_appg01_server").AppServer;

class UuJokesError extends UseCaseError {
  static get ERROR_PREFIX() {
    return "uu-jokes-main/";
  }

  constructor(dtoOut, paramMap = {}, cause = null) {
    if (paramMap instanceof Error) {
      cause = paramMap;
      paramMap = {};
    }

    super({ dtoOut, paramMap, cause, status: 400 });
  }
}

module.exports = UuJokesError;
