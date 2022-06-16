import React from "react";

import UnixDate from "./UnixDate";
import UnixTime from "./UnixTime";

import WeatherIcon from "../WeatherIcons";

export default function TomorrowPlus(props) {
  const sunrise = props.dayAfter.sunrise;
  const sunset = props.dayAfter.sunset;
  const tempAv = props.dayAfter.temp.day;
  const tempMin = props.dayAfter.temp.min;
  const tempMax = props.dayAfter.temp.max;
  const unixDate = props.dayAfter.dt;
  const weatherDescription = props.dayAfter.weather[0].main;
  const weatherEmoji = props.dayAfter.weather[0].icon;
  const windSpeed = props.dayAfter.wind_speed;

  return (
    <div className="card3-small">
      <div className="row" id="card3">
        <div className="col-2">
          <span className="c3-date-title">
            <UnixDate unixstamp={unixDate} />
          </span>
        </div>

        <div className="col-3">
          <span id="c3Temp">{Math.round(tempAv)}°C</span>
        </div>

        <div className="col-1 c3-wind-weather-col">
          <span className="c3-emoji-weather">
            <WeatherIcon code={weatherEmoji} className="c3-descp" />
          </span>
          <p className="c3-descp">
            <em>{weatherDescription}</em>
          </p>
        </div>

        <div className="col-2">
          <span className="c3-emoji-wind">
            <i className="fa-solid fa-wind"></i>
          </span>
          <p className="c3-wind">
            <em>
              <span id="c3WindNum">{Math.round(windSpeed)}</span>
              <span className="unit-wind"> km/h</span>
            </em>
          </p>
        </div>

        <div className="col-1 c3-high-low-col">
          <div className="row">
            <p className="c3-list-high-sun-up">High:</p>
            <p className="c3-list-high-sun-up">Low:</p>
          </div>
        </div>

        <div className="col-1 c3-high-low-col">
          <div className="row">
            <p className="c3-list-temp-time" id="c3HighTemp">
              {Math.round(tempMin)}
              <span className="unit-temp">°C</span>
            </p>
            <p className="c3-list-temp-time" id="c3LowTemp">
              {Math.round(tempMax)}
              <span className="unit-temp">°C</span>
            </p>
          </div>
        </div>

        <div className="col-1 c3-sun-col">
          <div className="row">
            <p className="c3-list-high-sun-up">
              <i className="fa-solid fa-sun"></i>
              <i className="fa-solid fa-arrow-up"></i>:
            </p>
            <p className="c3-list-high-sun-up">
              <i className="fa-solid fa-sun"></i>
              <i className="fa-solid fa-arrow-down"></i>:
            </p>
          </div>
        </div>

        <div className="col-1 c3-sun-col">
          <div className="row">
            <p className="c3-list-temp-time c3-sun-up">
              <UnixTime timestamp={sunrise} />
            </p>
            <p className="c3-list-temp-time c3-sun-down">
              <UnixTime timestamp={sunset} />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
