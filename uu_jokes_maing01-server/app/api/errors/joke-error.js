"use strict";

const UuJokesError = require("./jokes-main-use-case-error");
const JOKE_ERROR_PREFIX = `${UuJokesError.ERROR_PREFIX}joke/`;

const Create = {
  UC_CODE: `${JOKE_ERROR_PREFIX}create/`,

  JokesInstanceDoesNotExist: class extends UuJokesError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}jokesInstanceDoesNotExist`;
      this.message = "JokesInstance does not exist.";
    }
  },
  JokesInstanceNotInProperState: class extends UuJokesError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}jokesInstanceNotInProperState`;
      this.message = "JokesInstance is not in proper state.";
    }
  },
  InvalidDtoIn: class extends UuJokesError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  // UuBinaryCreateFailed: class extends UuJokesError {
  //   constructor() {
  //     super(...arguments);
  //     this.code = `${Create.UC_CODE}uuBinaryCreateFailed`;
  //     this.message = "Creating uuBinary failed.";
  //   }
  // },
  JokeDaoCreateFailed: class extends UuJokesError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}jokeDaoCreateFailed`;
      this.message = "Create joke by joke DAO create failed.";
    }
  }
  // ,
  // InvalidPhotoContentType: class extends UuJokesError {
  //   constructor() {
  //     super(...arguments);
  //     this.code = `${Create.UC_CODE}invalidPhotoContentType`;
  //     this.message = "ContentType of new photo is invalid.";
  //   }
  // }
};

const Get = {
  UC_CODE: `${JOKE_ERROR_PREFIX}get/`,
  JokesInstanceDoesNotExist: class extends UuJokesError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}jokesInstanceDoesNotExist`;
      this.message = "JokesInstance does not exist.";
    }
  },
  JokesInstanceNotInProperState: class extends UuJokesError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}jokesInstanceNotInProperState`;
      this.message = "JokesInstance is not in proper state.";
    }
  },
  JokesInstanceIsUnderConstruction: class extends UuJokesError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}jokesInstanceIsUnderConstruction`;
      this.message = "JokesInstance is in underConstruction state.";
    }
  },
  InvalidDtoIn: class extends UuJokesError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  JokeDoesNotExist: class extends UuJokesError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}jokeDoesNotExist`;
      this.message = "Joke does not exist.";
    }
  }
};

const Update = {
  UC_CODE: `${JOKE_ERROR_PREFIX}update/`,
  JokesInstanceDoesNotExist: class extends UuJokesError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}jokesInstanceDoesNotExist`;
      this.message = "JokesInstance does not exist.";
    }
  },
  JokesInstanceNotInProperState: class extends UuJokesError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}jokesInstanceNotInProperState`;
      this.message = "JokesInstance is not in proper state [active|underConstruction].";
    }
  },
  InvalidDtoIn: class extends UuJokesError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  UserNotAuthorized: class extends UuJokesError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}userNotAuthorized`;
      this.message = "User is not authorized.";
    }
  },
  JokeDoesNotExist: class extends UuJokesError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}jokeDoesNotExist`;
      this.message = "Joke does not exist.";
    }
  },
  // UuBinaryCreateFailed: class extends UuJokesError {
  //   constructor() {
  //     super(...arguments);
  //     this.code = `${Update.UC_CODE}uuBinaryCreateFailed`;
  //     this.message = "Creating uuBinary failed.";
  //   }
  // },
  // UuBinaryUpdateBinaryDataFailed: class extends UuJokesError {
  //   constructor() {
  //     super(...arguments);
  //     this.code = `${Update.UC_CODE}uuBinaryUpdateBinaryDataFailed`;
  //     this.message = "Updating uuBinary data failed.";
  //   }
  // },
  JokeDaoUpdateFailed: class extends UuJokesError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}jokeDaoUpdateFailed`;
      this.message = "Update joke by joke Dao update failed.";
    }
  }
};

const UpdateVisibility = {
  UC_CODE: `${JOKE_ERROR_PREFIX}updateVisibility/`,
  JokeDaoUpdateVisibilityFailed: class extends UuJokesError {
    constructor() {
      super(...arguments);
      this.code = `${UpdateVisibility.UC_CODE}jokeDaoUpdateVisibilityFailed`;
      this.message = "Update joke by joke Dao updateVisibility failed";
    }
  },
  JokesInstanceDoesNotExist: class extends UuJokesError {
    constructor() {
      super(...arguments);
      this.code = `${UpdateVisibility.UC_CODE}jokesInstanceDoesNotExist`;
      this.message = "JokesInstance does not exist.";
    }
  },
  JokesInstanceNotInProperState: class extends UuJokesError {
    constructor() {
      super(...arguments);
      this.code = `${UpdateVisibility.UC_CODE}jokesInstanceNotInProperState`;
      this.message = "JokesInstance is not in proper state [active|underConstruction].";
    }
  },
  InvalidDtoIn: class extends UuJokesError {
    constructor() {
      super(...arguments);
      this.code = `${UpdateVisibility.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  }
};

const Delete = {
  UC_CODE: `${JOKE_ERROR_PREFIX}delete/`,
  JokesInstanceDoesNotExist: class extends UuJokesError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}jokesInstanceDoesNotExist`;
      this.message = "JokesInstance does not exist.";
    }
  },
  JokesInstanceNotInProperState: class extends UuJokesError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}jokesInstanceNotInProperState`;
      this.message = "JokesInstance is not in proper state.";
    }
  },
  InvalidDtoIn: class extends UuJokesError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  JokeDoesNotExist: class extends UuJokesError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}jokeDoesNotExist`;
      this.message = "Joke does not exist.";
    }
  },
  UserNotAuthorized: class extends UuJokesError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}userNotAuthorized`;
      this.message = "User is not authorized.";
    }
  }
  // ,
  // UuBinaryDeleteFailed: class extends UuJokesError {
  //   constructor() {
  //     super(...arguments);
  //     this.code = `${Delete.UC_CODE}uuBinaryDeleteFailed`;
  //     this.message = "Deleting uuBinary failed.";
  //   }
  // }
};

const List = {
  UC_CODE: `${JOKE_ERROR_PREFIX}list/`,
  JokesInstanceDoesNotExist: class extends UuJokesError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}jokesInstanceDoesNotExist`;
      this.message = "JokesInstance does not exist.";
    }
  },
  JokesInstanceNotInProperState: class extends UuJokesError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}jokesInstanceNotInProperState`;
      this.message = "JokesInstance is not in proper state [active|underConstruction].";
    }
  },
  JokesInstanceIsUnderConstruction: class extends UuJokesError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}jokesInstanceIsUnderConstruction`;
      this.message = "JokesInstance is in state underConstruction.";
    }
  },
  InvalidDtoIn: class extends UuJokesError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  }
};

// const AddRating = {
//   UC_CODE: `${JOKE_ERROR_PREFIX}addRating/`,
//   JokesInstanceDoesNotExist: class extends UuJokesError {
//     constructor() {
//       super(...arguments);
//       this.code = `${AddRating.UC_CODE}jokesInstanceDoesNotExist`;
//       this.message = "JokesInstance does not exist.";
//     }
//   },
//   JokesInstanceNotInProperState: class extends UuJokesError {
//     constructor() {
//       super(...arguments);
//       this.code = `${AddRating.UC_CODE}jokesInstanceNotInProperState`;
//       this.message = "JokesInstance is not in proper state [active|underConstruction].";
//     }
//   },
//   InvalidDtoIn: class extends UuJokesError {
//     constructor() {
//       super(...arguments);
//       this.code = `${AddRating.UC_CODE}invalidDtoIn`;
//       this.message = "DtoIn is not valid.";
//     }
//   },
//   JokeDoesNotExist: class extends UuJokesError {
//     constructor() {
//       super(...arguments);
//       this.code = `${AddRating.UC_CODE}jokeDoesNotExist`;
//       this.message = "Joke does not exist.";
//     }
//   },
//   UserNotAuthorized: class extends UuJokesError {
//     constructor() {
//       super(...arguments);
//       this.code = `${AddRating.UC_CODE}userNotAuthorized`;
//       this.message = "User is not authorized.";
//     }
//   },
//   JokeRatingDaoUpdateFailed: class extends UuJokesError {
//     constructor() {
//       super(...arguments);
//       this.code = `${AddRating.UC_CODE}jokeRatingDaoUpdateFailed`;
//       this.message = "Update jokeRating by jokeRating DAO update failed.";
//     }
//   },
//   JokeRatingDaoCreateFailed: class extends UuJokesError {
//     constructor() {
//       super(...arguments);
//       this.code = `${AddRating.UC_CODE}jokeRatingDaoCreateFailed`;
//       this.message = "Create jokeRating by jokeRating DAO create failed.";
//     }
//   },
//   JokeDaoUpdateFailed: class extends UuJokesError {
//     constructor() {
//       super(...arguments);
//       this.code = `${AddRating.UC_CODE}jokeDaoUpdateFailed`;
//       this.message = "Update joke by joke DAO update failed.";
//     }
//   }
// };

module.exports = {
  Create,
  Get,
  Update,
  UpdateVisibility,
  Delete,
  List,
  // AddRating,
};
