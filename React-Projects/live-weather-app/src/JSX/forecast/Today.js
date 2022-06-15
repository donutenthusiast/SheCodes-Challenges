import React from "react";

import UnixTime from "./UnixTime";
import ShortDate from "./ShortDate";
import LocalTime from "./LocalTime";

import TodayMainTemp from "./TodayMainTemp";

import WeatherIcon from "../WeatherIcons";

export default function Today(props) {
  let changeUnit = props.unit;

  function newUnits() {
    let buttonText = document.querySelector("#set-unit-temp-btn");

    if (changeUnit === true) {
      return (buttonText.innerHTML = `View Weather in Metric Units`);
    } else {
      return (buttonText.innerHTML = `View Weather in Imperial Units`);
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
              <span id="c1Date">
                <ShortDate date={new Date()} />
              </span>
            </div>
            <div className="col-4">
              <span id="c1Time">
                <LocalTime currentDate={new Date()} />
              </span>
            </div>
          </div>
        </div>

        <div className="col-12 c1-conditions-row">
          <div className="row">
            <div className="col-sm-6 text-center">
              <span id="c1Temp">
                <TodayMainTemp temp={props.todaysWeather.tempAv} />
              </span>
              <p id="c1Feels">
                <em>
                  Feels like{" "}
                  <span id="feelTemp">
                    <TodayMainTemp temp={props.todaysWeather.tempFeel} />
                  </span>
                  <span className="unit-temp"></span>
                </em>
              </p>
            </div>
            <div className="col-sm-3 text-center">
              <WeatherIcon
                code={props.todaysWeather.iconCode}
                id="c1EmojiWeatherSrc"
              />
              <p id="c1Descp">
                <em>{props.todaysWeather.description}</em>
              </p>
            </div>
            <div className="col-sm-3 text-center">
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
                <span id="c1HighTemp">
                  <TodayMainTemp temp={props.todaysWeather.tempHigh} />
                </span>
                <span className="unit-temp"></span>
              </p>
            </div>
            <div className="col-3">
              <p className="c1-highs-lows">Low:</p>
            </div>
            <div className="col-3">
              <p className="c1-highs-lows">
                <span id="c1LowTemp">
                  <TodayMainTemp temp={props.todaysWeather.tempLow} />
                </span>
                <span className="unit-temp"></span>
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
                <UnixTime time={props.todaysWeather.sunUp} />
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
                <UnixTime time={props.todaysWeather.sunDown} />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
