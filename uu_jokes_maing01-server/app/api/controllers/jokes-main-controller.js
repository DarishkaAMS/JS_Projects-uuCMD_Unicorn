"use strict";
const JokesInstanceAbl = require("../../abl/jokes-main-abl.js");

class JokesInstanceController {
  init(ucEnv) {
    return JokesInstanceAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }
}

module.exports = new JokesInstanceController();
