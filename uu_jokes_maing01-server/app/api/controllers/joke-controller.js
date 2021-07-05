"use strict";
const JokeAbl = require("../../abl/joke-abl.js");

class JokeController {

  create(ucEnv) {
    return JokeAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.parameters, ucEnv.session, ucEnv.getAuthorizationResult());
  }

  static get(ucEnv) {
    return JokeAbl.get(ucEnv.uri.getAwid(), ucEnv.getDtoIn(), ucEnv.parameters, ucEnv.getAuthorizationResult());
  }

  static update(ucEnv) {
    return JokeAbl.update(ucEnv.uri.getAwid(), ucEnv.getDtoIn(), ucEnv.parameters, ucEnv.session, ucEnv.getAuthorizationResult());
  }

  static delete(ucEnv) {
    return JokeAbl.delete(ucEnv.uri.getAwid(), ucEnv.parameters, ucEnv.session, ucEnv.getAuthorizationResult());
  }

  static list(ucEnv) {
    return JokeAbl.list(ucEnv.uri.getAwid(), ucEnv.parameters, ucEnv.getAuthorizationResult());
  }
}

module.exports = new JokeController();
