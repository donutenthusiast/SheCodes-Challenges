import React, {useState} from "react";

import axios from "axios";

import ForecastIndex from "./ForecastIndex";

export default function Search() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [city, setCity] = useState("");
  const [todaysWeather, setTodaysWeather] = useState({});

  let todaysImageURL = `https://openweathermap.org/img/wn/${todaysWeather.iconCode}@2x.png`;

  function cityName(event) {
    setCity(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (city !== "") {
      const apiKey = "cd2317fe4740983ade94670ca1806f44";
      const openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      axios.get(openWeatherUrl).then(displayWeather);
    }
  }

  function displayWeather(response) {
    console.log(response.data);
    setIsLoaded(true);
    setTodaysWeather({
      apiCity: response.data.name,
      apiCountry: response.data.sys.country,
      description: response.data.weather[0].description,
      iconCode: response.data.weather[0].icon,
      humidity: response.data.main.humidity,
      sunUp: response.data.sys.sunrise,
      sunDown: response.data.sys.sunset,
      tempAv: Math.round(response.data.main.temp),
      tempFeel: Math.round(response.data.main.feels_like),
      tempLow: Math.round(response.data.main.temp_min),
      tempHigh: Math.round(response.data.main.temp_max),
      windSpeed: Math.round(response.data.wind.speed),
    });
    console.log(todaysWeather.apiLocation);
  }

  const searchForm = (
    <form id="searchForm" onClick={handleSubmit}>
      <input
        type="text"
        placeholder="Enter the name of a city"
        id="searchInput"
        onChange={cityName}
      />
      <button type="submit" className="btn btn-secondary" id="searchBtn">
        Search
      </button>
      <button className="btn btn-secondary" type="button" id="autoLocateBtn">
        <div id="searchError"></div>
        <i className="fa-solid fa-location-crosshairs"></i> Locate Me
      </button>
    </form>
  );

  if (isLoaded === true) {
    return (
      <div className="row search-location">
        <div className="col-1" id="inlineBtns"></div>
        <div className="col-11"></div>
        {searchForm}
        <div>
          <span>
            <ForecastIndex
              todaysWeather={todaysWeather}
              todaysImageURL={todaysImageURL}
            />
          </span>
        </div>
      </div>
    );
  } else {
    return (
      <div className="row search-location">
        <div className="col-1" id="inlineBtns"></div>
        <div className="col-11"></div>
        {searchForm}
      </div>
    );
  }
}
