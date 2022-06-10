import React, {useState} from "react";

import axios from "axios";

import Today from "./forecast/Today";
import Tomorrow from "./forecast/Tomorrow";
import TomorrowPlus from "./forecast/TomorrowPlus";

export default function ForecastIndex() {
  const [temp, setApiTemp] = useState(null);

  //const apiKey = "cd2317fe4740983ade94670ca1806f44";

  let openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=london&appid=${null}&units=metric`;
  axios.get(openWeatherUrl).then(displayTemp);

  function displayTemp(response) {
    setApiTemp(Math.round(response.data.main.temp));
  }

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
