/* eslint-disable */
const jokesInstanceInitDtoInType = shape({
  uuAppProfileAuthorities: uri().isRequired("uuBtLocationUri"),
  uuBtLocationUri: uri().isRequired("uuAppProfileAuthorities"),
  state: oneOf(["active", "underConstruction", "closed"]),
  name: uu5String(4000),
  logo: binary()
});
//
// const jokesInstancePlugInBtDtoInType = shape({
//   uuBtLocationUri: uri().isRequired(),
// });

// const jokesInstanceSetLogoDtoInType = shape({
//   type: oneOf("16x9","3x2","4x3","2x3","10x1","1x10"),
//   logo: binary().isRequired()
// });
//
// const jokesInstanceUpdateDtoInType = shape({
//   state: oneOf(["active", "underConstruction", "closed"]),
//   name: uu5String(4000)
// });
//
// const jokeInstaceSetIconsDtoInType = shape({
//   data: binary().isRequired()
// })
//
// const getProductLogoDtoInType = shape({
//   type: oneOf("16x9","3x2","4x3","2x3","10x1","1x10")
// });
//
// const jokeInstaceGetUveMetaDataDtoInType = shape({
//   type: string().isRequired()
// });

