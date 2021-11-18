import React from "react";
import ReactDOM from "react-dom";
import regeneratorRuntime from "regenerator-runtime";
import s from "./style.css";

function App() {
  return (
    <React.Fragment>
      <h1 className={s.blue}>Hello World</h1>
    </React.Fragment>
  );
}

const rootDiv = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootDiv
);

module.hot.accept();
