import * as React from "react";
import * as ReactDOM from "react-dom";
import * as External from "my-external";

export const main = () => {
  console.log(External.Component.Hey.Component);
  ReactDOM.render(<External.Component.Hey.Component />, document.getElementById("app"));
}

main();
