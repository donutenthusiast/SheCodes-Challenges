import React from "react";

export default function Day3() {
  return (
    <div className="card3-small">
      <div className="row" id="card3">
        <div className="col-3">
          <span className="c3-date-title">Tue</span>
          <span className="c3-date-title"> 7</span>
        </div>

        <div className="col-2">
          <span id="c3Temp">
            <span className="unit-temp">19°C</span>
          </span>
        </div>

        <div className="col-1 c3-wind-weather-col">
          <span className="c3-emoji-weather">
            <img
              className="c3-emoji-weather-src"
              src="https://openweathermap.org/img/wn/01n@2x.png"
              alt="Dynamic emoji representative of the day's weather"
            />
          </span>
          <p className="c3-descp">
            <em>Rain</em>
          </p>
        </div>

        <div className="col-2">
          <span className="c3-emoji-wind">
            <i className="fa-solid fa-wind"></i>
          </span>
          <p className="c3-wind">
            <em>
              <span id="c3WindNum">4</span>
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
              21
              <span className="unit-temp">°C</span>
            </p>
            <p className="c3-list-temp-time" id="c3LowTemp">
              12
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
            <p className="c3-list-temp-time c3-sun-up">05:45</p>
            <p className="c3-list-temp-time c3-sun-down">22:13</p>
          </div>
        </div>
      </div>
    </div>
  );
}
