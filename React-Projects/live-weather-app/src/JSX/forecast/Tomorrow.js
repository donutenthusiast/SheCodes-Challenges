import React from "react";

export default function Tomorrow() {
  return (
    <div className="card" id="card2">
      <div id="card2Body">
        <div className="row">
          <div className="col-6 text-end">
            <span id="c2Title1">Tomorrow</span>
          </div>
          <div className="col-6">
            <span id="c2Title2">
              <span id="c2Title2Day">Mon</span>
              <span id="c2Title2Date"> 6</span>
            </span>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-4">
            <p className="c2-temp">
              <span id="c2-temp-num">11</span>
              <span className="unit-temp">°C</span>
            </p>
          </div>

          <div className="col-sm-3" id="c2EmojiCol">
            <span className="c2-temp" id="c2EmojiWeather">
              <img
                id="c2EmojiWeatherSrc"
                src="https://openweathermap.org/img/wn/01n@2x.png"
                alt="Dynamic emoji representative of the day's weather"
              />
            </span>
            <p id="c2Descp">
              <em>Light rain</em>
            </p>
          </div>

          <div className="col-sm-3" id="c2WindCol">
            <span className="c2-temp">
              <span id="c2EmojiWind">
                <i className="fa-solid fa-wind"></i>
              </span>
            </span>
            <p className="text-start" id="c2Wind">
              <em>
                <span id="c2WindNum">3</span>
                <span className="unit-wind"> km/h</span>
              </em>
            </p>
          </div>

          <div className="col-sm-1">
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

          <div className="col-sm-1 c2-list-col">
            <div className="row">
              <p className="c2-list">
                <span id="c2HighTemp">15</span>
                <span className="unit-temp">°C</span>
              </p>
              <p className="c2-list">
                <span id="c2LowTemp">11</span>
                <span className="unit-temp">°C</span>
              </p>
              <p className="c2-list">
                <span id="c2SunUp">05:45</span>
              </p>
              <p className="c2-list">
                <span id="c2SunDown">22:12</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
