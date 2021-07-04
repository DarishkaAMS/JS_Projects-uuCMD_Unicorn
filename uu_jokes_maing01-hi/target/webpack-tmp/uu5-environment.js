
var devConfig = require("C:\\Users\\user\\Desktop\\Hatchery\\JS_Projects-uuCMD_Unicorn\\uu_jokes_maing01-hi\\env\\development.json").uu5Environment;
var config = require("C:\\Users\\user\\Desktop\\Hatchery\\JS_Projects-uuCMD_Unicorn\\uu_jokes_maing01-hi\\env\\production.json").uu5Environment || {};
if (devConfig) for (var k in devConfig) config[k] = devConfig[k];
window.UU5 = { Environment: config };
