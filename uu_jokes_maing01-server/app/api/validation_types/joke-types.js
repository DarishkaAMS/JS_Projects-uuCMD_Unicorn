/* eslint-disable */

const jokeCreateDtoInType = shape({
  name: uu5String(255).isRequired(),
  text: uu5String(4000),
  // categoryList: array(id(), 10),
  // image: binary()
});

const jokeGetDtoInType = shape({
  id: id().isRequired()
});

const jokeUpdateDtoInType = shape({
  id: id().isRequired(),
  name: uu5String(255),
  text: uu5String(4000),
  // categoryList: array(id(), 10),
  // image: binary()
});

const jokeDeleteDtoInType = shape({
  id: id().isRequired()
});

const jokeListDtoInType = shape({
  sortBy: oneOf(["name", "rating"]),
  order: oneOf(["asc", "desc"]),
  categoryList: array(id(), 10),
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer()
  })
});

