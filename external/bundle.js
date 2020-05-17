const pkg = require("./package.json");
const dts = require("dts-bundle");
const path = require("path");

dts.bundle({
	name: pkg.name,
  main: path.join(__dirname, "lib/index.d.ts"),
  out: path.join(__dirname, "dist/application.d.ts"),
  prefix: '__',
});
