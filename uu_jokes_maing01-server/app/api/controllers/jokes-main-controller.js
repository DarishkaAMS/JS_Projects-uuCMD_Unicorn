"use strict";

const JokesInstanceAbl = require("../../abl/jokes-instance-abl.js");

// const CACHE_VALUE = "public, max-age=86400, s-maxage=86400";

class JokesInstanceController {
  static init(ucEnv) {
    return JokesInstanceAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }

  // static plugInBt(ucEnv) {
  //   return JokesInstanceAbl.plugInBt(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  // }
  // static load(ucEnv) {
  //   return JokesInstanceAbl.load(ucEnv.uri.getAwid(), ucEnv.getAuthorizationResult());
  // }

  static update(ucEnv) {
    return JokesInstanceAbl.update(ucEnv.uri.getAwid(), ucEnv.parameters);
  }

  // static setLogo(ucEnv) {
  //   return JokesInstanceAbl.setLogo(ucEnv.uri.getAwid(), ucEnv.parameters);
  // }
  //
  // static setIcons(ucEnv) {
  //   return JokesInstanceAbl.setIcons(ucEnv.uri.getAwid(), ucEnv.parameters, ucEnv.getUri());
  // }

  static getProductInfo(ucEnv) {
    ucEnv.getResponse().setHeaders({ "Cache-Control": CACHE_VALUE });
    return JokesInstanceAbl.getProductInfo(ucEnv.uri.getAwid());
  }

  // static async getProductLogo(ucEnv) {
  //   let dtoOut = await JokesInstanceAbl.getProductLogo(ucEnv.getUri().getAwid(), ucEnv.parameters);
  //   ucEnv.getResponse().setHeaders({ "Cache-Control": CACHE_VALUE });
  //   return ucEnv.setBinaryDtoOut(dtoOut);
  // }
  //
  // static async getUveMetaData(ucEnv) {
  //   let dtoOut = await JokesInstanceAbl.getUveMetaData(ucEnv.getUri().getAwid(), ucEnv.parameters);
  //   ucEnv.getResponse().setHeaders({ "Cache-Control": CACHE_VALUE });
  //   return ucEnv.setBinaryDtoOut(dtoOut);
  // }
  //
  // static async getIndex(ucEnv) {
  //   ucEnv.getResponse().setHeaders({ "Cache-Control": CACHE_VALUE });
  //   return JokesInstanceAbl.getIndex(ucEnv.uri.getAwid(), ucEnv.getUri());
  // }
}

module.exports = JokesInstanceController;
