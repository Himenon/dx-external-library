const pkg = require("./package.json");
const dts = require("dts-bundle");
const path = require("path");

dts.bundle({
	name: pkg.name + "2",
  main: path.join(__dirname, "lib/PrivateComponent/index.d.ts"),
  out: path.join(__dirname, "PrivateComponent.d.ts"),
  prefix: '__',
});

dts.bundle({
	name: pkg.name + "2",
  main: path.join(__dirname, "lib/Component/index.d.ts"),
  out: path.join(__dirname, "Component.d.ts"),
  prefix: '__',
});
