import * as React from "react";
import * as ReactDOM from "react-dom";
import * as MyExternalComponent from "my-external";
import * as PrivateComponent from "my-external/PrivateComponent";

const App = () => {
  return (
    <div>
      <h1>My Application</h1>
      <MyExternalComponent.Board.Component name="my-external!!" />
      <PrivateComponent.Panel.Component title="private-component" />
    </div>
  );
};

export const main = () => {
  window.onload = () => {
    ReactDOM.render(<App />, document.getElementById("app"));
  };
};

main();
