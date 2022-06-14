import React from "react";

import WeatherIcon from "../WeatherIcons";

export default function Today(props) {
  function todaysDate(anyDate) {
    let weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let dayofWeek = weekday[anyDate.getDay()];
    let dateOfMonth = anyDate.getDate();

    if (dateOfMonth < 10) {
      return `${dayofWeek} 0${dateOfMonth}`;
    } else {
      return `${dayofWeek} ${dateOfMonth}`;
    }
  }

  function timeToLocal(input) {
    let unixTime = input;
    let userTime = new Date(unixTime * 1000);
    let hh = userTime.getHours();
    let mm = userTime.getMinutes();

    if (hh < 10 && mm < 10) {
      return `0${hh}:0${mm}`;
    } else if (hh < 10 && mm >= 10) {
      return `0${hh}:${mm}`;
    } else if (hh >= 10 && mm < 10) {
      return `${hh}:0${mm}`;
    } else {
      return `${hh}:${mm}`;
    }
  }

  function currentTime() {
    let date = new Date();
    let hours = date.getHours();
    let mins = date.getMinutes();

    if (hours < 10 && mins < 10) {
      return `0${hours}:0${mins}`;
    } else if (hours < 10 && mins >= 10) {
      return `0${hours}:${mins}`;
    } else if (hours >= 10 && mins < 10) {
      return `${hours}:0${mins}`;
    } else {
      return `${hours}:${mins}`;
    }
  }

  return (
    <div className="card" id="cardLarge">
      <span className="col-8"></span>
      <span className="col-4">
        <WeatherIcon code={props.todaysWeather.iconCode} id="backgroundImage" />
      </span>

      <div className="row card-body">
        <div className="col-12">
          <div className="row align-items-start">
            <div className="col-sm-11">
              <span id="c1City">{props.todaysWeather.apiCity}</span>
            </div>
            <div className="col-sm-1 c1-country-outer">
              <span id="c1Country">{props.todaysWeather.apiCountry}</span>
            </div>
          </div>
        </div>

        <div className="col-12 c1-date-row">
          <div className="row">
            <div className="col-4">
              <span id="c1Day">Today</span>
            </div>
            <div className="col-4">
              <span id="c1Date">{todaysDate(new Date())}</span>
            </div>
            <div className="col-4">
              <span id="c1Time">{currentTime(new Date())}</span>
            </div>
          </div>
        </div>

        <div className="col-12 c1-conditions-row">
          <div className="row">
            <div className="col-sm-4 text-center">
              <span id="c1Temp">
                <span id="c1TempNum">{props.todaysWeather.tempAv}</span>
                <span className="unit-temp">°C</span>
              </span>
              <p id="c1Feels">
                <em>
                  Feels like{" "}
                  <span id="feelTemp">{props.todaysWeather.tempFeel}</span>
                  <span className="unitTemp">°C</span>
                </em>
              </p>
            </div>
            <div className="col-sm-4 text-center">
              <WeatherIcon
                code={props.todaysWeather.iconCode}
                id="c1EmojiWeatherSrc"
              />
              <p id="c1Descp">
                <em>{props.todaysWeather.description}</em>
              </p>
            </div>
            <div className="col-sm-4 text-center">
              <span id="c1EmojiWind">
                <i className="fa-solid fa-wind"></i>
              </span>
              <p id="c1Wind">
                <em>
                  <span id="c1WindNum">{props.todaysWeather.windSpeed}</span>
                  <span className="unit-wind"> km/h</span>
                </em>
              </p>
            </div>
          </div>
        </div>

        <div className="col-12 c1-high-lows-row">
          <div className="row">
            <div className="col-3">
              <p className="c1-highs-lows">High:</p>
            </div>
            <div className="col-3">
              <p className="c1-highs-lows">
                <span id="c1HighTemp">{props.todaysWeather.tempHigh}</span>
                <span className="unit-temp">°C</span>
              </p>
            </div>
            <div className="col-3">
              <p className="c1-highs-lows">Low:</p>
            </div>
            <div className="col-3">
              <p className="c1-highs-lows">
                <span id="c1LowTemp">{props.todaysWeather.tempLow}</span>
                <span className="unit-temp">°C</span>
              </p>
            </div>
          </div>
        </div>

        <div className="col-12 c1-sunrise-sunset-row">
          <div className="row">
            <div className="col-3">
              <p className="c1-sunrise-sunset">
                <i className="fa-solid fa-sun"></i>
                <i className="fa-solid fa-arrow-up"></i>:
              </p>
            </div>

            <div className="col-3">
              <p className="c1-sunrise-sunset" id="c1SunUp">
                {timeToLocal(props.todaysWeather.sunUp)}
              </p>
            </div>

            <div className="col-3">
              <p className="c1-sunrise-sunset">
                <i className="fa-solid fa-sun"></i>
                <i className="fa-solid fa-arrow-down"></i>:
              </p>
            </div>

            <div className="col-3">
              <p className="c1-sunrise-sunset" id="c1SunDown">
                {timeToLocal(props.todaysWeather.sunDown)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
