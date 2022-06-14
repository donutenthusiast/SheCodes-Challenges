import React from "react";

import Today from "./forecast/Today";
import Tomorrow from "./forecast/Tomorrow";
import TomorrowPlus from "./forecast/TomorrowPlus";

export default function ForecastIndex() {
  let todaysWeather = props.todaysWeather;
  let todaysImageURL = props.todaysImageURL;

  return (
    <div className="row">
      <div className="col-md-6">
        <Today todaysWeather={todaysWeather} todaysImageURL={todaysImageURL} />
      </div>
      <div className="col-md-6">
        <Tomorrow />
        <TomorrowPlus />
      </div>
    </div>
  );
}
