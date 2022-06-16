import React, {useState} from "react";

import axios from "axios";

import Today from "./forecast/Today";
import Tomorrow from "./forecast/Tomorrow";
import TomorrowPlus from "./forecast/TomorrowPlus";

export default function ForecastIndex(props) {
  const [tomorrow, setTomorrow] = useState(false);
  const [forecast, setGetForecast] = useState({});

  const todaysWeather = props.todaysWeather;
  const todaysImageURL = props.todaysImageURL;

  if (tomorrow === true) {
    return (
      <div className="row">
        <div className="col-md-6">
          <Today
            todaysWeather={todaysWeather}
            todaysImageURL={todaysImageURL}
          />
        </div>
        <div className="col-md-6 text-center">
          <Tomorrow forecast={forecast} />
          <TomorrowPlus />
        </div>
      </div>
    );
  } else {
    let latitude = props.todaysWeather.coords.lat;
    let longitude = props.todaysWeather.coords.lon;
    //cd2317fe4740983ade94670ca1806f44
    const apiKey = "cd2317fe4740983ade94670ca1806f44";
    const forecastURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly&appid=${apiKey}&units=metric`;
    axios.get(forecastURL).then(showForecast);

    function showForecast(response) {
      console.log("forecast");
      console.log(response);
      setTomorrow(true);
      setGetForecast({
        tomorrowsUnixTime: response.data.daily[1].dt,
        tomorrowsSunrise: response.data.daily[1].sunrise,
        tomorrowsSunset: response.data.daily[1].sunset,
        tomorrowsTempAv: response.data.daily[1].temp.day,
        tomorrowsTempMin: response.data.daily[1].temp.min,
        tomorrowsTempMax: response.data.daily[1].temp.max,
        tomorrowsWeatherDescp: response.data.daily[1].weather[0].description,
        tomorrowsWeatherEmoji: response.data.daily[1].weather[0].icon,
        tomorrowsWindSpeed: response.data.daily[1].wind_speed,
      });
    }
    return (
      <div className="row">
        <div className="col-md-12 text-center">
          <h2>Weather data is loading ...</h2>
        </div>
      </div>
    );
  }
}
