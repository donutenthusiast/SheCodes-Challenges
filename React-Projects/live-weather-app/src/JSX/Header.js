import React from "react";

export default function Header() {
  return (
    <div className="App">
      <div className="row">
        <div className="col-2"></div>
        <div className="col-8">
          <h1 id="pageTitle">Weather Forecast</h1>
        </div>
        <div className="col-2 text-end">
          <button id="nightMode">
            <span className="material-icons"> dark_mode </span>
          </button>
          <button id="dayMode">
            <span className="material-icons"> wb_sunny </span>
          </button>
        </div>
      </div>
    </div>
  );
}
