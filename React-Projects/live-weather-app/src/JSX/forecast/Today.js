import React from "react";

import UnixTime from "./UnixTime";
import ShortDate from "./ShortDate";
import LocalTime from "./LocalTime";

import WeatherIcon from "../WeatherIcons";

export default function Today(props) {
  return (
    <div className="card" id="cardLarge">
      <span className="col-8"></span>
      <span className="col-4">
        <WeatherIcon code={props.todaysWeather.iconCode} id="backgroundImage" />
      </span>

      <div className="row card-body">
        <div className="col-12">
          <div className="row align-items-start">
            <div className="col-11">
              <span id="c1City">{props.todaysWeather.apiCity}</span>
            </div>
            <div className="col-1 c1-country-outer">
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
                <ShortDate datestamp={new Date()} />
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
            <div className="col-4 text-center">
              <span id="c1Temp">
                <span id="c1TempNum">
                  {Math.round(props.todaysWeather.tempAv)}
                </span>
                <span className="unit-temp">°C</span>
              </span>
              <p id="c1Feels">
                <em>
                  Feels like{" "}
                  <span id="feelTemp">
                    {Math.round(props.todaysWeather.tempFeel)}
                  </span>
                  <span className="unitTemp">°C</span>
                </em>
              </p>
            </div>
            <div className="col-4 text-center">
              <WeatherIcon
                code={props.todaysWeather.iconCode}
                id="c1EmojiWeatherSrc"
              />
              <p id="c1Descp">
                <em>{props.todaysWeather.description}</em>
              </p>
            </div>
            <div className="col-4 text-center">
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
                  {Math.round(props.todaysWeather.tempHigh)}
                </span>
                <span className="unit-temp">°C</span>
              </p>
            </div>
            <div className="col-3">
              <p className="c1-highs-lows">Low:</p>
            </div>
            <div className="col-3">
              <p className="c1-highs-lows">
                <span id="c1LowTemp">
                  {Math.round(props.todaysWeather.tempLow)}
                </span>
                <span className="unitTemp">°C</span>
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
                <UnixTime timestamp={props.todaysWeather.sunUp} />
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
                <UnixTime timestamp={props.todaysWeather.sunDown} />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
