import React from "react";

export default function Today(props) {
  return (
    <div className="card" id="cardLarge">
      <span className="col-8"></span>
      <span className="col-4">
        <img
          id="backgroundImage"
          src={props.todaysImageURL}
          alt="Dynamic emoji representative of the day's weather"
        />
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
              <span id="c1Date">Sun 05</span>
            </div>
            <div className="col-4">
              <span id="c1Time">10:20</span>
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
              <img
                id="c1EmojiWeatherSrc"
                src={props.todaysImageURL}
                alt="Dynamic emoji representative of the day's weather"
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
                05:46
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
                22:11
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
