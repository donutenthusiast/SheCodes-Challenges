import React from "react";

import UnixDate from "./UnixDate";
import UnixTime from "./UnixTime";

import WeatherIcon from "../WeatherIcons";

export default function Tomorrow(props) {
  return (
    <div className="card" id="card2">
      <div id="card2Body">
        <div className="row">
          <div className="col-6 text-end">
            <span id="c2Title1">Tomorrow</span>
          </div>
          <div className="col-6 text-start">
            <span id="c2Title2">
              <span id="c2Title2Day">
                <UnixDate unixstamp={props.forecast.tomorrowsUnixDate} />
              </span>
            </span>
          </div>
        </div>

        <div className="row">
          <div className="col-4">
            <p className="c2-temp">
              <span id="c2-temp-num">
                {Math.round(props.forecast.tomorrowsTempAv)}
              </span>
              <span className="unit-temp">°C</span>
            </p>
          </div>

          <div className="col-2" id="c2EmojiCol">
            <span className="c2-temp" id="c2EmojiWeather">
              <WeatherIcon
                code={props.forecast.tomorrowsWeatherEmoji}
                id="c2EmojiWeatherSrc"
              />
            </span>
            <p id="c2Descp">
              <em>{props.forecast.tomorrowsWeatherDescp}</em>
            </p>
          </div>

          <div className="col-3" id="c2WindCol">
            <span className="c2-temp">
              <span id="c2EmojiWind">
                <i className="fa-solid fa-wind"></i>
              </span>
            </span>
            <p className="text-start" id="c2Wind">
              <em>
                <span id="c2WindNum">
                  {Math.round(props.forecast.tomorrowsWindSpeed)}
                </span>
                <span className="unit-wind"> km/h</span>
              </em>
            </p>
          </div>

          <div className="col-2">
            <div className="row">
              <p className="c2-list">High:</p>
              <p className="c2-list">Low:</p>
              <p className="c2-list">
                <i className="fa-solid fa-sun"></i>
                <i className="fa-solid fa-arrow-up"></i>:
              </p>
              <p className="c2-list">
                <i className="fa-solid fa-sun"></i>
                <i className="fa-solid fa-arrow-down"></i>:
              </p>
            </div>
          </div>

          <div className="col-1 c2-list-col">
            <div className="row">
              <p className="c2-list">
                <span id="c2HighTemp">
                  {Math.round(props.forecast.tomorrowsTempMax)}
                </span>
                <span className="unit-temp">°C</span>
              </p>
              <p className="c2-list">
                <span id="c2LowTemp">
                  {Math.round(props.forecast.tomorrowsTempMin)}
                </span>
                <span className="unit-temp">°C</span>
              </p>
              <p className="c2-list">
                <span id="c2SunUp">
                  <UnixTime timestamp={props.forecast.tomorrowsSunrise} />
                </span>
              </p>
              <p className="c2-list">
                <span id="c2SunDown">
                  <UnixTime timestamp={props.forecast.tomorrowsSunset} />
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
