/* eslint-disable */

const initDtoInType = shape({
  uuAppProfileAuthorities: uri().isRequired("uuBtLocationUri"),
  uuBtLocationUri: uri().isRequired("uuAppProfileAuthorities"),
  state: oneOf(["active", "underConstruction", "closed"]),
  name: uu5String(4000)
  // logo: binary()
});
