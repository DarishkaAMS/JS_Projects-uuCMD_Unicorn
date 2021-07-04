"use strict";

const UuJokesError = require("./jokes-main-use-case-error");
const JOKES_INSTANCE_ERROR_PREFIX = `${UuJokesError.ERROR_PREFIX}jokesInstance/`;

const Init = {
  UC_CODE: `${JOKES_INSTANCE_ERROR_PREFIX}init/`,
  JokesInstanceAlreadyInitialized: class extends UuJokesError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}jokesInstanceAlreadyInitialized`;
      this.message = "JokesInstance has been already initialized.";
    }
  },
  InvalidDtoIn: class extends UuJokesError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  // CreateAwscFailed: class extends UuJokesError {
  //   constructor() {
  //     super(...arguments);
  //     this.code = `${Init.UC_CODE}createAwscFailed`;
  //     this.message = "Create uuAwsc failed.";
  //   }
  // },
  SysSetProfileFailed: class extends UuJokesError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}sys/setProfileFailed`;
      this.message = "Create uuAppProfile failed.";
    }
  },
  // UuBinaryCreateFailed: class extends UuJokesError {
  //   constructor() {
  //     super(...arguments);
  //     this.code = `${Init.UC_CODE}uuBinaryCreateFailed`;
  //     this.message = "Creating uuBinary failed.";
  //   }
  // },
  JokesInstanceDaoCreateFailed: class extends UuJokesError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}jokesInstanceDaoCreateFailed`;
      this.message = "Create JokesInstance by jokesInstance DAO create failed.";
    }
  }
};

const Load = {
  UC_CODE: `${JOKES_INSTANCE_ERROR_PREFIX}load/`,
  JokesInstanceDoesNotExist: class extends UuJokesError {
    constructor() {
      super(...arguments);
      this.code = `${Load.UC_CODE}jokesInstanceDoesNotExist`;
      this.message = "JokesInstance does not exist.";
    }
  },
  JokesInstanceNotInProperState: class extends UuJokesError {
    constructor() {
      super(...arguments);
      this.code = `${Load.UC_CODE}jokesInstanceNotInProperState`;
      this.message = "JokesInstance is not in proper state.";
    }
  },
  JokesInstanceIsUnderConstruction: class extends UuJokesError {
    constructor() {
      super(...arguments);
      this.code = `${Load.UC_CODE}jokesInstanceIsUnderConstruction`;
      this.message = "JokesInstance is in state underConstruction.";
    }
  }
};

const Update = {
  UC_CODE: `${JOKES_INSTANCE_ERROR_PREFIX}update/`,
  InvalidDtoIn: class extends UuJokesError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  JokesInstanceDaoUpdateByAwidFailed: class extends UuJokesError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}jokesInstanceDaoUpdateByAwidFailed`;
      this.message = "Update JokesInstance by jokesInstance Dao updateByAwid failed.";
    }
  }
};
//
// const SetLogo = {
//   UC_CODE: `${JOKES_INSTANCE_ERROR_PREFIX}setLogo/`,
//   InvalidDtoIn: class extends UuJokesError {
//     constructor() {
//       super(...arguments);
//       this.code = `${SetLogo.UC_CODE}invalidDtoIn`;
//       this.message = "DtoIn is not valid.";
//     }
//   },
//   JokesInstanceDoesNotExist: class extends UuJokesError {
//     constructor() {
//       super(...arguments);
//       this.code = `${SetLogo.UC_CODE}jokesInstanceDoesNotExist`;
//       this.message = "JokesInstance does not exist.";
//     }
//   },
//   JokesInstanceNotInProperState: class extends UuJokesError {
//     constructor() {
//       super(...arguments);
//       this.code = `${SetLogo.UC_CODE}jokesInstanceNotInProperState`;
//       this.message = "JokesInstance is not in proper state [active|underConstruction].";
//     }
//   },
//   UuBinaryCreateFailed: class extends UuJokesError {
//     constructor() {
//       super(...arguments);
//       this.code = `${SetLogo.UC_CODE}uuBinaryCreateFailed`;
//       this.message = "Creating uuBinary failed.";
//     }
//   },
//   UuBinaryUpdateBinaryDataFailed: class extends UuJokesError {
//     constructor() {
//       super(...arguments);
//       this.code = `${SetLogo.UC_CODE}uuBinaryUpdateBinaryDataFailed`;
//       this.message = "Updating uuBinary data failed.";
//     }
//   },
//   JokesInstanceDaoUpdateByAwidFailed: class extends UuJokesError {
//     constructor() {
//       super(...arguments);
//       this.code = `${SetLogo.UC_CODE}jokesInstanceDaoUpdateByAwidFailed`;
//       this.message = "Update JokesInstance by jokesInstance Dao updateByAwid failed.";
//     }
//   }
// };
//
// const GetProductLogo = {
//   UC_CODE: `${JOKES_INSTANCE_ERROR_PREFIX}getProductLogo/`,
//   InvalidDtoIn: class extends UuJokesError {
//     constructor() {
//       super(...arguments);
//       this.code = `${GetProductLogo.UC_CODE}invalidDtoIn`;
//       this.message = "DtoIn is not valid.";
//     }
//   }
// };
//
// const GetIndex = {
//   UC_CODE: `${JOKES_INSTANCE_ERROR_PREFIX}getIndex/`,
//   UnableToReadHtmlFile: class extends UuJokesError {
//     constructor() {
//       super(...arguments);
//       this.code = `${GetIndex.UC_CODE}unableToReadHtmlFile`;
//       this.message = "Unable to read html file.";
//     }
//   }
// };
//
// const GetUveMetaData = {
//   UC_CODE: `${JOKES_INSTANCE_ERROR_PREFIX}getUveMetaData/`,
//   InvalidDtoIn: class extends UuJokesError {
//     constructor() {
//       super(...arguments);
//       this.code = `${GetUveMetaData.UC_CODE}invalidDtoIn`;
//       this.message = "DtoIn is not valid.";
//     }
//   }
// };
//
// const SetIcons = {
//   UC_CODE: `${JOKES_INSTANCE_ERROR_PREFIX}setIcons/`,
//   InvalidDtoIn: class extends UuJokesError {
//     constructor() {
//       super(...arguments);
//       this.code = `${SetIcons.UC_CODE}invalidDtoIn`;
//       this.message = "DtoIn is not valid.";
//     }
//   },
//   UuBinaryUpdateBinaryDataFailed: class extends UuJokesError {
//     constructor() {
//       super(...arguments);
//       this.code = `${SetIcons.UC_CODE}uuBinaryUpdateBinaryDataFailed`;
//       this.message = "Updating uuBinary data failed.";
//     }
//   },
//   UuBinaryCreateFailed: class extends UuJokesError {
//     constructor() {
//       super(...arguments);
//       this.code = `${SetIcons.UC_CODE}uuBinaryCreateFailed`;
//       this.message = "Creating uuBinary failed.";
//     }
//   },
//   JokesInstanceDoesNotExist: class extends UuJokesError {
//     constructor() {
//       super(...arguments);
//       this.code = `${SetIcons.UC_CODE}jokesInstanceDoesNotExist`;
//       this.message = "JokesInstance does not exist.";
//     }
//   },
//   JokesInstanceNotInProperState: class extends UuJokesError {
//     constructor() {
//       super(...arguments);
//       this.code = `${SetIcons.UC_CODE}jokesInstanceNotInProperState`;
//       this.message = "JokesInstance is not in proper state [active|underConstruction].";
//     }
//   },
//   JokesInstanceDaoUpdateByAwidFailed: class extends UuJokesError {
//     constructor() {
//       super(...arguments);
//       this.code = `${SetIcons.UC_CODE}jokesInstanceDaoUpdateByAwidFailed`;
//       this.message = "Update JokesInstance by JokesInstance Dao updateByAwid failed.";
//     }
//   }
// };

module.exports = {
  Init,
  Load,
  Update
  // ,
  // SetLogo,
  // GetProductLogo,
  // GetIndex,
  // GetUveMetaData,
  // SetIcons
};
