"use strict";

const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const { Profile, AppClientTokenService, UuAppWorkspace, UuAppWorkspaceError } = require("uu_appg01_server").Workspace;
const { UriBuilder } = require("uu_appg01_server").Uri;
const { LoggerFactory } = require("uu_appg01_server").Logging;
const { AppClient } = require("uu_appg01_server");
const Errors = require("../api/errors/jokes-instance-error");

// const { LruCache } = require("uu_appg01_server").Utils;
// const { UuBinaryErrors, UuBinaryModel: UuBinaryAbl } = require("uu_appg01_binarystore-cmd");
// const { SysProfileModel: SysProfileAbl, SysAppWorkspaceModel: SysAppWorkspaceAbl, AppClientTokenService, SysAppClientTokenModel: SysAppClientTokenAbl } = require("uu_appg01_server").Workspace;
//
// const Path = require("path");
// const fs = require("fs");
// const Xml2js = require("xml2js");
// const UnzipHelper = require("../helpers/unzip-helper");
// const StreamHelper = require("../helpers/stream-helper");

const WARNINGS = {
  initUnsupportedKeys: {
    code: `${Errors.Init.UC_CODE}unsupportedKeys`,
    message: "DtoIn contains unsupported keys. Please fix it",
  },
  updateUnsupportedKeys: {
    code: `${Errors.Update.UC_CODE}unsupportedKeys`,
    message: "DtoIn contains unsupported keys. Please fix it",
  },
  // setLogoUnsupportedKeys: {
  //   code: `${Errors.SetLogo.UC_CODE}unsupportedKeys`
  // },
  // setInconsUnsupportedKeys: {
  //   code: `${Errors.SetIcons.UC_CODE}unsupportedKeys`
  // },
  // getProductLogoUnsupportedKeys: {
  //   code: `${Errors.GetProductLogo.UC_CODE}unsupportedKeys`
  // },
  // getProductLogoLogoDoesNotExists: {
  //   code: `${Errors.GetProductLogo.UC_CODE}logoDoesNotExists`
  // },
  // getUveMetaDataUnsupportedKeys: {
  //   code: `${Errors.GetUveMetaData.UC_CODE}unsupportedKeys`
  // },
  // getUveMetaDataDataDoesNotExists: {
  //   code: `${Errors.GetUveMetaData.UC_CODE}dataDoesNotExists`
  // },
  // setIconsUnsupportedKeys: {
  //   code: `${Errors.SetIcons.UC_CODE}unsupportedFileNames`
  // }
};

const DEFAULTS = {
  // metaData: {
  //   favicon: {
  //     type: "image/x-icon",
  //     file: "../../public/assets/meta/favicon.ico"
  //   },
  //   "favicon-16x16": {
  //     type: "image/png",
  //     file: "../../public/assets/meta/favicon-16x16.png"
  //   },
  //   "favicon-32x32": {
  //     type: "image/png",
  //     file: "../../public/assets/meta/favicon-32x32.png"
  //   },
  //   "favicon-96x96": {
  //     type: "image/png",
  //     file: "../../public/assets/meta/favicon-96x96.png"
  //   },
  //   "favicon-194x194": {
  //     type: "image/png",
  //     file: "../../public/assets/meta/favicon-194x194.png"
  //   },
  //
  //   manifest: {
  //     type: "application/json",
  //     file: "../../public/assets/meta/manifest.json"
  //   },
  //   "apple-touch-icon-57x57": {
  //     type: "image/png",
  //     file: "../../public/assets/meta/apple-touch-icon-57x57.png"
  //   },
  //   "apple-touch-icon-60x60": {
  //     type: "image/png",
  //     file: "../../public/assets/meta/apple-touch-icon-60x60.png"
  //   },
  //   "apple-touch-icon-72x72": {
  //     type: "image/png",
  //     file: "../../public/assets/meta/apple-touch-icon-72x72.png"
  //   },
  //   "apple-touch-icon-76x76": {
  //     type: "image/png",
  //     file: "../../public/assets/meta/apple-touch-icon-76x76.png"
  //   },
  //   "apple-touch-icon-114x114": {
  //     type: "image/png",
  //     file: "../../public/assets/meta/apple-touch-icon-114x114.png"
  //   },
  //   "apple-touch-icon-120x120": {
  //     type: "image/png",
  //     file: "../../public/assets/meta/apple-touch-icon-120x120.png"
  //   },
  //   "apple-touch-icon-144x144": {
  //     type: "image/png",
  //     file: "../../public/assets/meta/apple-touch-icon-144x144.png"
  //   },
  //   "apple-touch-icon-152x152": {
  //     type: "image/png",
  //     file: "../../public/assets/meta/apple-touch-icon-152x152.png"
  //   },
  //   "apple-touch-icon-180x180": {
  //     type: "image/png",
  //     file: "../../public/assets/meta/apple-touch-icon-180x180.png"
  //   },
  //   "apple-touch-icon-512x512": {
  //     type: "image/png",
  //     file: "../../public/assets/meta/apple-touch-icon-512x512.png"
  //   },
  //
  //   tilecolor: "#014ca4",
  //   browserconfig: {
  //     type: "text/xml",
  //     file: "../../public/assets/meta/browserconfig.xml"
  //   },
  //   "mstile-144x144": {
  //     type: "image/png",
  //     file: "../../public/assets/meta/mstile-144x144.png"
  //   },
  //   "mstile-150x150": {
  //     type: "image/png",
  //     file: "../../public/assets/meta/mstile-150x150.png"
  //   },
  //   "mstile-310x150": {
  //     type: "image/png",
  //     file: "../../public/assets/meta/mstile-310x150.png"
  //   },
  //   "mstile-310x310": {
  //     type: "image/png",
  //     file: "../../public/assets/meta/mstile-310x310.png"
  //   },
  //   "safari-pinned-tab": {
  //     type: "image/svg+xml",
  //     file: "../../public/assets/meta/safari-pinned-tab.svg"
  //   }
  // },
  // name: "uuJokes",
  // description:
  //   "Database of jokes in which users can create and update jokes, manage them, rate them and sort them into categories.",
  // logoType: "16x9",
  // ttl: 60 * 60 * 1000
};

const logger = LoggerFactory.get("UuJokes.Models.JokesInstanceModel");

const DEFAULT_NAME = "uuJokes";
const AUTHORITIES = "Authorities";
const EXECUTIVES = "Executives";
const STATE_ACTIVE = "active";
const STATE_UNDER_CONSTRUCTION = "underConstruction";
const STATE_CLOSED = "closed";

class JokesInstanceAbl {
  constructor() {
    this.validator = new Validator(Path.join(__dirname, "..", "api", "validation_types", "jokes-instance-types.js"));
    this.dao = DaoFactory.getDao("jokesInstance");
    // this.categoryDao = DaoFactory.getDao("category");
    // redeclare some constants, so they can be used from other abls
    this.STATE_ACTIVE = STATE_ACTIVE;
    this.STATE_UNDER_CONSTRUCTION = STATE_UNDER_CONSTRUCTION;
    this.AUTHORITIES = AUTHORITIES;
    this.EXECUTIVES = EXECUTIVES;
    // this.metaDataCache = new LruCache({ maxAge: DEFAULTS.ttl });
  }

  async init(uri, dtoIn, session) {
    const awid = uri.getAwid();
    // Happy Day Scenario  1 - A1
    let jokeInstance = await this.dao.getByAwid(awid);

    if (jokeInstance) {
      throw new Errors.Init.JokesInstanceAlreadyInitialized();
    }

    // Happy Day Scenario  2 - A2, A3
    let validationResult = this.validator.validate("jokesInstanceInitDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.initUnsupportedKeys.code,
      Errors.Init.InvalidDtoIn
    );
    dtoIn.state = dtoIn.state || STATE_UNDER_CONSTRUCTION;
    dtoIn.name = dtoIn.name || DEFAULTS.name;
    dtoIn.awid = awid;

    // Happy Day Scenario  3
    await Promise.all([
      this.dao.createSchema(),
      DaoFactory.getDao("joke").createSchema()
      // ,
      // DaoFactory.getDao("jokeRating").createSchema(),
      // DaoFactory.getDao("category").createSchema()
    ]);

    // Happy Day Scenario  4
    try {
      jokeInstance = await this.dao.create(dtoIn);
    } catch (e) {
      // A4
      if (e instanceof ObjectStoreError) {
        throw new Errors.Init.JokesInstanceDaoCreateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    // Happy Day Scenario  5 & 6 - We do not work with logo (binary files)
    // if (dtoIn.logo) {
    //   let binary;
    //   try {
    //     binary = await UuBinaryAbl.createBinary(awid, { data: dtoIn.logo, code: "16x9" });
    //   } catch (e) {
    //     // A5
    //     throw new Errors.Init.UuBinaryCreateFailed({ uuAppErrorMap }, e);
    //   }
    //   dtoIn.logos = [DEFAULTS.logoType];
    //   delete dtoIn.logo;
    // }

    // Happy Day Scenario  6
    // if (dtoIn.uuBtLocationUri) {
    //   const baseUri = uri.getBaseUri();
    //   const uuBtUriBuilder = UriBuilder.parse(dtoIn.uuBtLocationUri);
    //   const location = uuBtUriBuilder.getParameters().id;
    //   const uuBtBaseUri = uuBtUriBuilder.toUri().getBaseUri();
    //
    //   await SysAppClientTokenAbl.initKeys(uri.getAwid());
    //
    //   const createAwscDtoIn = {
    //     name: dtoIn.name,
    //     typeCode: "uu-jokes-maing01",
    //     location: location,
    //     uuAppWorkspaceUri: baseUri
    //   };
    //
    //   const awscCreateUri = uuBtUriBuilder.setUseCase("uuAwsc/create").toUri();
    //   const appClientToken = await AppClientTokenService.createToken(uri, uuBtBaseUri);
    //   const callOpts = AppClientTokenService.setToken({ session }, appClientToken);
    //
    //   let awscDtoOut;
    //   try {
    //     awscDtoOut = await AppClient.post(awscCreateUri, createAwscDtoIn, callOpts);
    //   } catch (e) {
    //     // A6
    //     throw new Errors.Init.CreateAwscFailed({ uuAppErrorMap }, { location: dtoIn.uuBtLocationUri }, e);
    //   }
    //
    //   const artifactUri = uuBtUriBuilder.setUseCase(null).clearParameters().setParameter("id", awscDtoOut.id).toUri();
    //
    //   await SysAppWorkspaceAbl.connectArtifact(
    //     baseUri,
    //     {
    //       artifactUri: artifactUri.toString()
    //     },
    //     session
    //   );
    // }

    // Happy Day Scenario  7 - A7
    if (dtoIn.uuAppProfileAuthorities) {
      try {
        await SysProfileAbl.setProfile(awid, { code: AUTHORITIES, roleUri: dtoIn.uuAppProfileAuthorities });
      } catch (e) {
        throw new Errors.Init.SysSetProfileFailed({ uuAppErrorMap }, { role: dtoIn.uuAppProfileAuthorities }, e);
      }
    }

    // Happy Day Scenario  8
    jokeInstance.uuAppErrorMap = uuAppErrorMap;
    return jokeInstance;
  }

  // async plugInBt(uri, dtoIn, session) {
  //   const awid = uri.getAwid();
  //   // Happy Day Scenario  1
  //   let jokeInstance = await this.dao.getByAwid(awid);
  //   // A1
  //   if (!jokeInstance) {
  //     throw new Errors.Load.JokesInstanceDoesNotExist();
  //   }
  //
  //   // Happy Day Scenario  2
  //   let validationResult = this.validator.validate("jokesInstancePlugInBtDtoInType", dtoIn);
  //   // A2, A3
  //   let uuAppErrorMap = ValidationHelper.processValidationResult(
  //     dtoIn,
  //     validationResult,
  //     WARNINGS.initUnsupportedKeys.code,
  //     Errors.Init.InvalidDtoIn
  //   );
  //
  //   // Happy Day Scenario  3
  //   const baseUri = uri.getBaseUri();
  //   const uuBtUriBuilder = UriBuilder.parse(dtoIn.uuBtLocationUri);
  //   const location = uuBtUriBuilder.getParameters().id;
  //   const uuBtBaseUri = uuBtUriBuilder.toUri().getBaseUri();
  //
  //   const createAwscDtoIn = {
  //     name: jokeInstance.name,
  //     typeCode: "uu-jokes-maing01",
  //     location: location,
  //     uuAppWorkspaceUri: baseUri
  //   };
  //
  //   const awscCreateUri = uuBtUriBuilder.setUseCase("uuAwsc/create").toUri();
  //   const appClientToken = await AppClientTokenService.createToken(uri, uuBtBaseUri);
  //   const callOpts = AppClientTokenService.setToken({ session }, appClientToken);
  //
  //   let awscDtoOut;
  //   try {
  //     awscDtoOut = await AppClient.post(awscCreateUri, createAwscDtoIn, callOpts);
  //   } catch (e) {
  //     // A6
  //     throw new Errors.Init.CreateAwscFailed({ uuAppErrorMap }, { location: dtoIn.uuBtLocationUri }, e);
  //   }
  //
  //   const artifactUri = uuBtUriBuilder.setUseCase(null).clearParameters().setParameter("id", awscDtoOut.id).toUri();
  //
  //   await SysAppWorkspaceAbl.connectArtifact(
  //     baseUri,
  //     {
  //       artifactUri: artifactUri.toString()
  //     },
  //     session
  //   );
  //
  //   // Happy Day Scenario  4
  //   jokeInstance.uuAppErrorMap = uuAppErrorMap;
  //   return jokeInstance;
  // }
  //
  // async load(awid, authorizationResult) {
  //   // Happy Day Scenario  1 - A1, 1.1 - A2
  //   let jokesInstance = await this.checkInstance(
  //     awid,
  //     Errors.Load.JokesInstanceDoesNotExist,
  //     Errors.Load.JokesInstanceNotInProperState
  //   );
  //   // A3
  //   let authorizedProfiles = authorizationResult.getAuthorizedProfiles();
  //   if (
  //     jokesInstance.state === STATE_UNDER_CONSTRUCTION &&
  //     !authorizedProfiles.includes(AUTHORITIES) &&
  //     !authorizedProfiles.includes(EXECUTIVES)
  //   ) {
  //     throw new Errors.Load.JokesInstanceIsUnderConstruction({}, { state: jokesInstance.state });
  //   }
  //
  //   // Happy Day Scenario  2
  //   jokesInstance.categoryList = (await this.categoryDao.list(awid)).itemList;
  //
  //   // Happy Day Scenario  3
  //   jokesInstance.authorizedProfileList = authorizedProfiles;
  //
  //   // Happy Day Scenario  4
  //   return jokesInstance;
  // }

  // async update(awid, dtoIn) {
  //   // Happy Day Scenario 1
  //   let validationResult = this.validator.validate("jokesInstanceUpdateDtoInType", dtoIn);
  //   // A1, A2
  //   let uuAppErrorMap = ValidationHelper.processValidationResult(
  //     dtoIn,
  //     validationResult,
  //     WARNINGS.updateUnsupportedKeys.code,
  //     Errors.Update.InvalidDtoIn
  //   );
  //
  //   // Happy Day Scenario  3
  //   let jokesInstance;
  //   try {
  //     dtoIn.awid = awid;
  //     jokesInstance = await this.dao.updateByAwid(dtoIn);
  //   } catch (e) {
  //     if (e instanceof ObjectStoreError) {
  //       // A6
  //       throw new Errors.Update.JokesInstanceDaoUpdateByAwidFailed({ uuAppErrorMap }, e);
  //     }
  //     throw e;
  //   }
  //
  //   // Happy Day Scenario  4
  //   jokesInstance.uuAppErrorMap = uuAppErrorMap;
  //   return jokesInstance;
  // }

  // async setLogo(awid, dtoIn) {
  //   // Happy Day Scenario  1
  //   let validationResult = this.validator.validate("jokesInstanceSetLogoDtoInType", dtoIn);
  //   // A1, A2
  //   let uuAppErrorMap = ValidationHelper.processValidationResult(
  //     dtoIn,
  //     validationResult,
  //     WARNINGS.setLogoUnsupportedKeys.code,
  //     Errors.SetLogo.InvalidDtoIn
  //   );
  //
  //   // Happy Day Scenario  2 - A3, Happy Day Scenario  2.1 - A4
  //   let jokesInstance = await this.checkInstance(
  //     awid,
  //     Errors.SetLogo.JokesInstanceDoesNotExist,
  //     Errors.SetLogo.JokesInstanceNotInProperState
  //   );
  //
  //   // Happy Day Scenario  3
  //   let type = dtoIn.type ? dtoIn.type : DEFAULTS.logoType;
  //   let binary;
  //   if (!jokesInstance.logos || !jokesInstance.logos.includes(type)) {
  //     // Happy Day Scenario  3.1
  //     try {
  //       binary = await UuBinaryAbl.createBinary(awid, { data: dtoIn.logo, code: type });
  //     } catch (e) {
  //       // A5
  //       throw new Errors.SetLogo.UuBinaryCreateFailed(uuAppErrorMap, e);
  //     }
  //   } else {
  //     // Happy Day Scenario  3.2
  //     try {
  //       binary = await UuBinaryAbl.updateBinaryData(awid, { data: dtoIn.logo, code: type, revisionStrategy: "NONE" });
  //     } catch (e) {
  //       // A6
  //       throw new Errors.SetLogo.UuBinaryUpdateBinaryDataFailed(uuAppErrorMap, e);
  //     }
  //   }
  //
  //   // Happy Day Scenario  4
  //   if (!jokesInstance.logos) jokesInstance.logos = [];
  //   jokesInstance.logos.push(type);
  //   jokesInstance.awid = awid;
  //
  //   try {
  //     jokesInstance = await this.dao.updateByAwid(jokesInstance);
  //   } catch (e) {
  //     if (e instanceof ObjectStoreError) {
  //       // A7
  //       throw new Errors.SetLogo.JokesInstanceDaoUpdateByAwidFailed({ uuAppErrorMap }, e);
  //     }
  //     throw e;
  //   }
  //
  //   // Happy Day Scenario  5
  //   jokesInstance.uuAppErrorMap = uuAppErrorMap;
  //   return jokesInstance;
  // }

  // async setIcons(awid, dtoIn, uri) {
  //   //Happy Day Scenario  1
  //   let validationResult = this.validator.validate("jokeInstaceSetIconsDtoInType", dtoIn);
  //   // A1, A2
  //   let uuAppErrorMap = ValidationHelper.processValidationResult(
  //     dtoIn,
  //     validationResult,
  //     WARNINGS.setInconsUnsupportedKeys.code,
  //     Errors.SetIcons.InvalidDtoIn
  //   );
  //
  //   //Happy Day Scenario 2 - A3, A4
  //   let jokesInstance = await this.checkInstance(
  //     awid,
  //     Errors.SetIcons.JokesInstanceDoesNotExist,
  //     Errors.SetIcons.JokesInstanceNotInProperState
  //   );
  //
  //   let uveMetaData = jokesInstance.uveMetaData || {};
  //   let name = jokesInstance.name || DEFAULT_NAME;
  //
  //   //HHappy Day Scenario DS 3
  //   await UnzipHelper.unzip(
  //     dtoIn.data,
  //     async data => (uveMetaData = await this._store(data, uveMetaData, uri, name, awid, uuAppErrorMap))
  //   );
  //
  //   jokesInstance.uveMetaData = uveMetaData;
  //
  //   //Happy Day Scenario 4 A8
  //   try {
  //     jokesInstance = await this.dao.updateByAwid(jokesInstance);
  //   } catch (e) {
  //     throw new Errors.SetIcons.JokesInstanceDaoUpdateByAwidFailed({ uuAppErrorMap }, e);
  //   }
  //   jokesInstance.uuAppErrorMap = uuAppErrorMap;
  //
  //   //Happy Day Scenario  5
  //   this.metaDataCache.set(awid, uveMetaData);
  //
  //   //Happy Day Scenario  6;
  //   return jokesInstance;
  // }

  // async _store(data, uveMetaData, uri, name, awid, uuAppErrorMap) {
  //   if (data.type === "File") {
  //     let code = this._codeFromFileName(data.path);
  //     let underscoredCode = code.replace(/-/g, "_");
  //
  //     if (code === "manifest") {
  //       data = await this._fillManifest(data, uri, name);
  //     } else if (code === "browserconfig") {
  //       data = await this._fillBrowserConfig(data, uri);
  //     }
  //
  //     //Happy Day Scenario 3.1 A5
  //     const codeReq = /^[0-9a-zA-Z-]{3,64}$/;
  //     if (!code.match(codeReq)) {
  //       if (!uuAppErrorMap[WARNINGS.setIconsUnsupportedKeys.code]) {
  //         ValidationHelper.addWarning(uuAppErrorMap, WARNINGS.setIconsUnsupportedKeys.code, {
  //           unsupportedFileNameList: [code]
  //         });
  //       } else {
  //         uuAppErrorMap[WARNINGS.setIconsUnsupportedKeys.code].paramMap.unsupportedFileNameList.push(code);
  //       }
  //     } else {
  //       try {
  //         // Happy Day Scenario 3.2
  //         if (uveMetaData[code]) {
  //           // Happy Day Scenario  3.2.1
  //           await UuBinaryAbl.updateBinaryData(awid, {
  //             data,
  //             code: underscoredCode,
  //             createVersion: false,
  //             revisionStrategy: "NONE"
  //           });
  //         } else {
  //           //Happy Day Scenario 3.2.2
  //           await UuBinaryAbl.createBinary(awid, { data, code: underscoredCode });
  //           uveMetaData[code] = underscoredCode;
  //         }
  //       } catch (e) {
  //         if (e instanceof BinaryStoreCmdError) {
  //           if (e.code.indexOf(UuBinaryErrors.CreateBinary.UC_CODE) !== -1) {
  //             //A6
  //             throw new Errors.SetIcons.UuBinaryCreateFailed(uuAppErrorMap, { cause: e }, e);
  //           } else {
  //             //A7
  //             throw new Errors.SetIcons.UuBinaryUpdateBinaryDataFailed(uuAppErrorMap, { cause: e }, e);
  //           }
  //         }
  //         throw e;
  //       }
  //     }
  //   }
  //
  //   return uveMetaData;
  // }
  //
  // _codeFromFileName(fileName) {
  //   let end = fileName.lastIndexOf(".") === -1 ? fileName.length : fileName.lastIndexOf(".");
  //   let start = fileName.lastIndexOf("/") === -1 ? 0 : fileName.lastIndexOf("/") + 1;
  //   return fileName.substring(start, end);
  // }
  //
  // async _fillManifest(stream, uri, name) {
  //   let manifest = await StreamHelper.readableStreamToString(stream);
  //   manifest = JSON.parse(manifest);
  //
  //   manifest.name = name;
  //   manifest.short_name = name;
  //   let icons = manifest.icons;
  //   icons.forEach(icon => {
  //     let iconCode = this._codeFromFileName(icon.src);
  //     icon.src = `${uri.getBaseUri()}/jokesInstance/getUveMetaData?type=${iconCode}`;
  //   });
  //
  //   let stringifiedStream = JSON.stringify(manifest);
  //   return StreamHelper.stringToReadableStream(stringifiedStream);
  // }
  //
  // async _fillBrowserConfig(stream, uri) {
  //   let xmlFromString = await StreamHelper.readableStreamToString(stream);
  //   let filledBrowserConfig = new Promise((resolve, reject) => {
  //     Xml2js.parseString(xmlFromString, (err, data) => {
  //       if (err) {
  //         reject(err);
  //       }
  //       let keys = Object.keys(data.browserconfig.msapplication[0].tile[0]);
  //       keys.forEach(key => {
  //         let tile = data.browserconfig.msapplication[0].tile[0][key][0]["$"];
  //         if (tile) {
  //           let iconCode = this._codeFromFileName(tile.src);
  //           tile.src = `${uri.getBaseUri()}/jokesInstance/getUveMetaData?type=${iconCode}`;
  //         }
  //       });
  //       let builder = new Xml2js.Builder();
  //       let xmlData = builder.buildObject(data);
  //       resolve(xmlData);
  //     });
  //   });
  //
  //   filledBrowserConfig = await filledBrowserConfig;
  //   return StreamHelper.stringToReadableStream(filledBrowserConfig);
  // }
  //
  // async getProductInfo(awid) {
  //   // Happy Day Scenario 1
  //   let jokesInstance = await this.dao.getByAwid(awid);
  //   // Happy Day Scenario 2
  //   return {
  //     name: jokesInstance ? jokesInstance.name : DEFAULTS.name,
  //     uuAppErrorMap: {}
  //   };
  // }
  //
  // async getProductLogo(awid, dtoIn) {
  //   // Happy Day Scenario 1
  //   let validationResult = this.validator.validate("getProductLogoDtoInType", dtoIn);
  //   // A1, A2
  //   let uuAppErrorMap = ValidationHelper.processValidationResult(
  //     dtoIn,
  //     validationResult,
  //     WARNINGS.getProductLogoUnsupportedKeys.code,
  //     Errors.GetProductLogo.InvalidDtoIn
  //   );
  //
  //   // Happy Day Scenario 2
  //   let type = dtoIn.type ? dtoIn.type : DEFAULTS.logoType;
  //   let dtoOut = {};
  //   let jokesInstance = await this.dao.getByAwid(awid);
  //   if (jokesInstance && jokesInstance.logos && jokesInstance.logos.includes(type)) {
  //     try {
  //       dtoOut = await UuBinaryAbl.getBinaryData(awid, { code: type });
  //     } catch (e) {
  //       // A3
  //       if (logger.isWarnLoggable()) {
  //         logger.warn(`Unable to load uuBinary logo ${type} for jokes instance ${awid}. Error: ${e} `);
  //       }
  //       ValidationHelper.addWarning(uuAppErrorMap, WARNINGS.getProductLogoLogoDoesNotExists.code, {
  //         type: type
  //       });
  //     }
  //   }
  //
  //   // Happy Day Scenario 2.1
  //   if (!dtoOut.stream) {
  //     let filePath = Path.resolve(__dirname, `../../public/assets/logos/${type}.jpeg`);
  //     dtoOut.contentType = "image/png";
  //     dtoOut.stream = fs.createReadStream(filePath);
  //   }
  //
  //   // Happy Day Scenario 3
  //   dtoOut.uuAppErrorMap = uuAppErrorMap;
  //   return dtoOut;
  // }
  //
  // async getUveMetaData(awid, dtoIn) {
  //   // Happy Day Scenario 1
  //   let validationResult = this.validator.validate("jokeInstaceGetUveMetaDataDtoInType", dtoIn);
  //   // A1, A2
  //   let uuAppErrorMap = ValidationHelper.processValidationResult(
  //     dtoIn,
  //     validationResult,
  //     WARNINGS.getUveMetaDataUnsupportedKeys.code,
  //     Errors.GetUveMetaData.InvalidDtoIn
  //   );
  //
  //   // Happy Day Scenario 2
  //   let dtoOut = {};
  //   let jokesInstance;
  //   let uveMetaData = this.metaDataCache.get(awid);
  //   if (!uveMetaData) {
  //     jokesInstance = await this.dao.getByAwid(awid);
  //     uveMetaData = jokesInstance.uveMetaData ? jokesInstance.uveMetaData : {};
  //     this.metaDataCache.set(awid, uveMetaData);
  //   }
  //
  //   if (uveMetaData && uveMetaData[dtoIn.type]) {
  //     try {
  //       dtoOut = await UuBinaryAbl.getBinaryData(awid, { code: uveMetaData[dtoIn.type] });
  //     } catch (e) {
  //       // A3
  //       if (logger.isWarnLoggable()) {
  //         logger.warn(`Unable to load uuBinary meta data ${dtoIn.type} for jokes instance ${awid}. Error: ${e} `);
  //       }
  //       ValidationHelper.addWarning(uuAppErrorMap, WARNINGS.getUveMetaDataDataDoesNotExists.code, {
  //         type: dtoIn.type
  //       });
  //     }
  //   }
  //
  //   // Happy Day Scenario 2.1
  //   if (!dtoOut.stream) {
  //     let filePath = Path.resolve(__dirname, DEFAULTS.metaData[dtoIn.type].file);
  //     dtoOut.contentType = DEFAULTS.metaData[dtoIn.type].type;
  //     dtoOut.stream = fs.createReadStream(filePath);
  //   }
  //
  //   // Happy Day Scenario 3
  //   dtoOut.uuAppErrorMap = uuAppErrorMap;
  //   return dtoOut;
  // }
  //
  // async getIndex(awid, uri) {
  //   let readFilePromise = new Promise((resolve, reject) => {
  //     return fs.readFile(Path.resolve(`./public/index.html`), "utf8", (err, contents) => {
  //       if (err) throw new Errors.GetIndex.UnableToReadHtmlFile(err);
  //       resolve(contents);
  //     });
  //   });
  //   let indexHtml = await readFilePromise;
  //
  //   let uveMetaData = this.metaDataCache.get(awid);
  //   if (!uveMetaData) {
  //     let jokesInstance = await this.dao.getByAwid(awid);
  //     uveMetaData = jokesInstance && jokesInstance.uveMetaData ? jokesInstance.uveMetaData : {};
  //     uveMetaData.name = jokesInstance ? jokesInstance.name : DEFAULTS.name;
  //     uveMetaData.description =
  //       jokesInstance && jokesInstance.description ? jokesInstance.description : DEFAULTS.description;
  //     this.metaDataCache.set(awid, uveMetaData);
  //   }
  //
  //   let metatags = `
  //   <title>${uveMetaData.name}</title>
  //   <meta name="description" content="${uveMetaData.description}" />
  //   <meta property="og:title" content="${uveMetaData.name}" />
  //   <meta property="og:image" content="${uri.getBaseUri()}/getProductLogo?type=${DEFAULTS.logoType}" />
  //   <meta property="og:image:type" content="image/jpg" />
  //   <meta property="og:image:width" content="1200" />
  //   <meta property="og:image:height" content="630" />
  //   <meta property="og:description" content="${uveMetaData.description}" />
  //   <meta property="og:url" content="${uri.getBaseUri()}/" />
  //
  //   <link rel="icon" href="${uri.getBaseUri()}/jokesInstance/getUveMetaData?type=favicon-32x32"/>
  //   <link rel="icon" type="image/png" sizes="16x16" href="${uri.getBaseUri()}/jokesInstance/getUveMetaData?type=favicon-16x16"/>
  //   <link rel="icon" type="image/png" sizes="32x32" href="${uri.getBaseUri()}/jokesInstance/getUveMetaData?type=favicon-32x32"/>
  //   <link rel="icon" type="image/png" sizes="96x96" href="${uri.getBaseUri()}/jokesInstance/getUveMetaData?type=favicon-96x96"/>
  //   <link rel="icon" type="image/png" sizes="194x194" href="${uri.getBaseUri()}/jokesInstance/getUveMetaData?type=favicon-194x194"/>
  //
  //   <meta name="mobile-web-app-capable" content="yes">
  //   <meta name="apple-mobile-web-app-title" content="${uveMetaData.name}">
  //   <meta name="apple-mobile-web-app-status-bar-style" content="default">
  //   <link rel="manifest" href="${uri.getBaseUri()}/jokesInstance/getUveMetaData?type=manifest"/>
  //
  //   <link rel="apple-touch-icon-precomposed" sizes="57x57" href="${uri.getBaseUri()}/jokesInstance/getUveMetaData?type=touchicon-57x57"/>
  //   <link rel="apple-touch-icon-precomposed" sizes="60x60" href="${uri.getBaseUri()}/jokesInstance/getUveMetaData?type=touchicon-60x60"/>
  //   <link rel="apple-touch-icon-precomposed" sizes="72x72" href="${uri.getBaseUri()}/jokesInstance/getUveMetaData?type=touchicon-72x72"/>
  //   <link rel="apple-touch-icon-precomposed" sizes="76x76" href="${uri.getBaseUri()}/jokesInstance/getUveMetaData?type=touchicon-76x76"/>
  //   <link rel="apple-touch-icon-precomposed" sizes="114x114" href="${uri.getBaseUri()}/jokesInstance/getUveMetaData?type=touchicon-114x114"/>
  //   <link rel="apple-touch-icon-precomposed" sizes="120x120" href="${uri.getBaseUri()}/jokesInstance/getUveMetaData?type=touchicon-120x120"/>
  //   <link rel="apple-touch-icon-precomposed" sizes="144x144" href="${uri.getBaseUri()}/jokesInstance/getUveMetaData?type=touchicon-144x144"/>
  //   <link rel="apple-touch-icon-precomposed" sizes="152x152" href="${uri.getBaseUri()}/jokesInstance/getUveMetaData?type=touchicon-152x152"/>
  //   <link rel="apple-touch-icon-precomposed" sizes="180x180" href="${uri.getBaseUri()}/jokesInstance/getUveMetaData?type=touchicon-180x180"/>
  //   <link rel="apple-touch-icon-precomposed" sizes="512x512" href="${uri.getBaseUri()}/jokesInstance/getUveMetaData?type=touchicon-512x512"/>
  //
  //   <meta name="application-name" content="${uveMetaData.name}">
  //   <meta name="msapplication-TileColor" content="${
  //     uveMetaData["tilecolor"] ? uveMetaData["tilecolor"] : DEFAULTS.metaData["tilecolor"]
  //   }"/>
  //   <meta name="msapplication-config" content="${uri.getBaseUri()}/jokesInstance/getUveMetaData?type=browserconfig"/>
  //
  //   <link rel="mask-icon" href="${uri.getBaseUri()}/jokesInstance/getUveMetaData?type=safari-pinned-tab" color="#d81e05"/>
  //   `;
  //
  //   indexHtml = indexHtml.replace('<meta name="uuapp-meta-template">', metatags);
  //
  //   return indexHtml;
  // }
  //
  // /**
  //  * Checks whether jokes instance exists and that it is not in closed state.
  //  * @param {String} awid Used awid
  //  * @param {Error} notExistError Error thrown when jokes instance does not exist
  //  * @param {Error} closedStateError Error thrown when jokes instance is in closed state
  //  * @returns {Promise<{}>} jokes instance
  //  */
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
