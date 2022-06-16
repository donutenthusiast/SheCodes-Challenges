import React, {useState, useEffect} from "react";

import axios from "axios";

import Today from "./forecast/Today";
import Tomorrow from "./forecast/Tomorrow";
import TomorrowPlus from "./forecast/TomorrowPlus";

export default function ForecastIndex(props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [forecast, setGetForecast] = useState({});
  const [dayAfter, setDayAfter] = useState(null);

  const todaysWeather = props.todaysWeather;
  const todaysImageURL = props.todaysImageURL;

  useEffect(() => {
    setIsLoaded(false);
  }, [props.todaysWeather.coords]);

  if (isLoaded === true) {
    return (
      <span>
        <div className="row">
          <div className="col-md-6">
            <Today
              todaysWeather={todaysWeather}
              todaysImageURL={todaysImageURL}
            />
          </div>
          <div className="col-md-6 text-center">
            <Tomorrow forecast={forecast} />
            {
              // eslint-disable-next-line
              dayAfter.map(function (dayAfter, index) {
                if (index >= 2 && index <= 4)
                  return (
                    <span key={index}>
                      <TomorrowPlus dayAfter={dayAfter} />
                    </span>
                  );
              })
            }
          </div>
        </div>
        <div className="col-12 semi-footer">
          <em>
            Weather Icons (Meteocons){" "}
            <a
              className="footLink"
              target="blank"
              rel="noreferrer noopener"
              href="https://github.com/basmilius/weather-icons"
            >
              by Bas Milius
            </a>
          </em>
        </div>
      </span>
    );
  } else {
    let latitude = props.todaysWeather.coords.lat;
    let longitude = props.todaysWeather.coords.lon;
    //cd2317fe4740983ade94670ca1806f44
    const apiKey = "cd2317fe4740983ade94670ca1806f44";
    const forecastURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly&appid=${apiKey}&units=metric`;
    axios.get(forecastURL).then(showForecast);

    function showForecast(response) {
      setIsLoaded(true);
      console.log("tomorrow");
      setGetForecast({
        tomorrowsSunrise: response.data.daily[1].sunrise,
        tomorrowsSunset: response.data.daily[1].sunset,
        tomorrowsTempAv: response.data.daily[1].temp.day,
        tomorrowsTempMin: response.data.daily[1].temp.min,
        tomorrowsTempMax: response.data.daily[1].temp.max,
        tomorrowsUnixDate: response.data.daily[1].dt,
        tomorrowsWeatherDescp: response.data.daily[1].weather[0].main,
        tomorrowsWeatherEmoji: response.data.daily[1].weather[0].icon,
        tomorrowsWindSpeed: response.data.daily[1].wind_speed,
      });
      setDayAfter(response.data.daily);
    }
    return (
      <div className="row">
        <div className="col-md-12 text-center">
          <h2>Searching for weather info...</h2>
        </div>
      </div>
    );
  }
}
