import * as React from "react";
import * as ReactDOM from "react-dom";
import * as MyExternalComponent from "my-external/Component";

export const main = () => {
  ReactDOM.render(<External.Component.Hey.Component />, document.getElementById("app"));
}

main();
