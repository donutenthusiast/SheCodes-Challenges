import React, {useState} from "react";

import axios from "axios";

import Today from "./forecast/Today";
import Tomorrow from "./forecast/Tomorrow";
import TomorrowPlus from "./forecast/TomorrowPlus";

export default function ForecastIndex() {
  return (
    <div className="row">
      <div className="col-12">
        <h2>Hello from forecast</h2>
        <p>
          Right now, the temperature in{" "}
          <strong>
            <em>London</em>
          </strong>{" "}
          is{" "}
          <strong>
            <em>{temp}°C</em>
          </strong>
        </p>
      </div>

      <div className="col-md-6">
        <Today />
      </div>
      <div className="col-md-6">
        <Tomorrow />
        <TomorrowPlus />
      </div>
    </div>
  );
}
