import React, {useState} from "react";

import axios from "axios";

export default function ForecastIndex() {
  const [temp, setApiTemp] = useState(null);

  //const apiKey = "cd2317fe4740983ade94670ca1806f44";

  let openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=london&appid=${null}&units=metric`;
  axios.get(openWeatherUrl).then(displayTemp);

  function displayTemp(response) {
    setApiTemp(Math.round(response.data.main.temp));
  }

  return (
    <div>
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
  );
}
