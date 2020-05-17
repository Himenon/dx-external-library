const pkg = require("./package.json");
const dts = require("dts-bundle");
const path = require("path");

dts.bundle({
	name: pkg.name,
  main: path.join(__dirname, "lib/Component/index.d.ts"),
  out: path.join(__dirname, "index.d.ts"),
  prefix: '__',
});

dts.bundle({
	name: path.join(pkg.name, "PrivateComponent"),
  main: path.join(__dirname, "lib/PrivateComponent/index.d.ts"),
  out: path.join(__dirname, "PrivateComponent.d.ts"),
  prefix: '__',
});
