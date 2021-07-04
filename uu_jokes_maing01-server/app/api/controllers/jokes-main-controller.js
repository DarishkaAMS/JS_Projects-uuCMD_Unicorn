"use strict";
const JokesMainAbl = require("../../abl/jokes-main-abl.js");

class JokesMainController {
  init(ucEnv) {
    return JokesMainAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }
}

module.exports = new JokesMainController();
