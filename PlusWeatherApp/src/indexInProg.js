//Current date
function shortDate(anyDate) {
  let weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let dayofWeek = weekday[anyDate.getDay()];
  let dateOfMonth = anyDate.getDate();

  if (dateOfMonth < 10) {
    return `${dayofWeek} 0${dateOfMonth}`;
  } else {
    return `${dayofWeek} ${dateOfMonth}`;
  }
}

//Current time
function currentTime(twentyFourHours) {
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

//Weather calls using city name
function cityNameSearch(cityName) {
  let openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(openWeatherUrl).then(getUserWeather);
}

function searchInput(event) {
  event.preventDefault();

  let cityInput = document.querySelector("#search-input").value;
  cityInput = cityInput.trim();

  if (cityInput != "") {
    cityNameSearch(cityInput);
  } else {
    alert(`Enter a city name to search for the weather.`);
  }
}

//Weather calls using Geolocation
function userPermissionOK() {
  return navigator.geolocation.getCurrentPosition(userAcceptsGeolocation);
}

function userAcceptsGeolocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let geoWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(geoWeatherUrl).then(getUserWeather);
}

//API response + Inner HTML updates
function getUserWeather(response) {
  //New values for global variables
  avTemp = response.data.main.temp;
  feelTemp = response.data.main.feels_like;
  minTemp = response.data.main.temp_min;
  maxTemp = response.data.main.temp_max;
  windSpeed = response.data.wind.speed;

  //New variable to be sent to another function
  let coordinates = response.data.coord;

  //Run forecast function using the coordinates variable above
  getForecast(coordinates);

  //New variables for this function
  let userCity = response.data.name;

  let userCountryCode = response.data.sys.country;

  let userDescription = response.data.weather[0].description;
  userDescription =
    userDescription[0].toUpperCase() + userDescription.substring(1);
  //can also style from CSS "element:first letter {text transform: capitlize}

  let sunUp = response.data.sys.sunrise;

  let sunDown = response.data.sys.sunset;

  let weatherEmoji = response.data.weather[0].icon;

  //InnerHTML text replacements in the large card for today's weather
  let replaceCountryCode = document.querySelector("#c1-country");
  replaceCountryCode.innerHTML = `${userCountryCode}`;

  let replaceFeelTemp = document.querySelector("#feel-temp");
  replaceFeelTemp.innerHTML = `${Math.round(feelTemp)}`;

  let replaceMainAvTemp = document.querySelector("#c1-temp-num");
  replaceMainAvTemp.innerHTML = `${Math.round(avTemp)}`;

  let replaceMainCity = document.querySelector("#c1-city");
  replaceMainCity.innerHTML = `${userCity}`;

  let replaceMainDescription = document.querySelector("#c1-descp");
  replaceMainDescription.innerHTML = `${userDescription}`;

  let replaceMainMinTemp = document.querySelector("#c1-low-temp");
  replaceMainMinTemp.innerHTML = `${Math.round(minTemp)}`;

  let replaceMainMaxTemp = document.querySelector("#c1-high-temp");
  replaceMainMaxTemp.innerHTML = `${Math.round(maxTemp)}`;

  let replaceMainSunsrise = document.querySelector("#c1-sun-up");
  replaceMainSunsrise.innerHTML = `${timeToLocal(sunUp)}`;

  let replaceMainSunset = document.querySelector("#c1-sun-down");
  replaceMainSunset.innerHTML = `${timeToLocal(sunDown)}`;

  let replaceWeatherEmoji = document.querySelector("#c1-emoji-weather-src");
  replaceWeatherEmoji.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${weatherEmoji}@2x.png`
  );

  let replaceWindSpeed = document.querySelector("#c1-wind-num");
  replaceWindSpeed.innerHTML = `${Math.round(windSpeed)}`;
}

function getForecast(coordinates) {
  let forecastLat = coordinates.lat;
  let forecaseLon = coordinates.lon;
  let forecastURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${forecastLat}&lon=${forecaseLon}&exclude=current,minutely,hourly&appid=${apiKey}&units=metric`;
  axios.get(forecastURL).then(showForecast);
}

function showForecast(response) {
  console.log(response);

  let tommorowsUnixTime = response.data.daily[1].dt;

  let tomorrowsWeekday = forecastDayToLocal(tommorowsUnixTime);
  console.log(tomorrowsWeekday);

  // Date part from the timestamp
  let forecastDate = new Date(tommorowsUnixTime * 1000).getDate();
  console.log(forecastDate);

  let replaceTomorrowsWeekday = document.querySelector("#c2-title2-day");
  replaceTomorrowsWeekday.innerHTML = `${tomorrowsWeekday} `;

  let replaceTomorrowsDate = document.querySelector("#c2-title2-date");
  replaceTomorrowsDate.innerHTML = `${forecastDate}`;
}

//Unix time conversion
function timeToLocal(input) {
  let unixTime = input;
  //convert to UTC timestamp
  let userTime = new Date(unixTime * 1000);
  // Hours part from the timestamp
  let hh = userTime.getHours();
  // Minutes part from the timestamp
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

//Unix date conversion
function forecastDayToLocal(input) {
  let futureUnixTime = input;
  let userTime = new Date(futureUnixTime * 1000);

  let weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let day = userTime.getDay();

  let forecastDay = weekday[day];

  return forecastDay;
}

//Imperial to metric calculations
function newUnits() {
  let buttonText = document.querySelector("#set-unit-temp-btn");
  let oldAvTemp = document.querySelector("#c1-temp-num");
  let oldFeelTemp = document.querySelector("#feel-temp");
  let oldMainMinTemp = document.querySelector("#c1-low-temp");
  let oldMainMaxTemp = document.querySelector("#c1-high-temp");
  let oldWindSpeed = document.querySelector("#c1-wind-num");

  if (buttonText.textContent === "View Weather in Imperial Units") {
    return (
      (buttonText.innerHTML = `View Weather in Metric Units`),
      (oldAvTemp.innerHTML = `${Math.round((avTemp * 9) / 5 + 32)}`),
      (oldFeelTemp.innerHTML = `${Math.round((feelTemp * 9) / 5 + 32)}`),
      (oldMainMinTemp.innerHTML = `${Math.round((minTemp * 9) / 5 + 32)}`),
      (oldMainMaxTemp.innerHTML = `${Math.round((maxTemp * 9) / 5 + 32)}`),
      (oldWindSpeed.innerHTML = `${Math.round(windSpeed * 0.62137119)}`),
      allUnitsImperial()
    );
  } else {
    return (
      (buttonText.innerHTML = `View Weather in Imperial Units`),
      (oldAvTemp.innerHTML = `${Math.round(avTemp)}`),
      (oldFeelTemp.innerHTML = `${Math.round(feelTemp)}`),
      (oldMainMinTemp.innerHTML = `${Math.round(minTemp)}`),
      (oldMainMaxTemp.innerHTML = `${Math.round(maxTemp)}`),
      (oldWindSpeed.innerHTML = `${Math.round(windSpeed)}`),
      allUnitsMetric()
    );
  }
}

//Units texts to imperial
function allUnitsImperial() {
  let allUnits = document.querySelectorAll(".unitTemp");
  let i;
  for (i = 0; i < allUnits.length; i++) {
    allUnits[i].innerHTML = `°F`;
  }
  let windUnit = document.querySelector(".unitWind");
  windUnit.innerHTML = ` Miles/h`;
}

//Unit texts to metric
function allUnitsMetric() {
  let allUnits = document.querySelectorAll(".unitTemp");
  let i;
  for (i = 0; i < allUnits.length; i++) {
    allUnits[i].innerHTML = `°C`;
  }
  let windUnit = document.querySelector(".unitWind");
  windUnit.innerHTML = ` Km/h`;
}

//Api key
const apiKey = "cd2317fe4740983ade94670ca1806f44";

//Global units
let avTemp = null;
let feelTemp = null;
let minTemp = null;
let maxTemp = null;
let windSpeed = null;

//default location on page load
cityNameSearch("London");

//Get today
let today = document.querySelector("#c1-date");
today.innerHTML = shortDate(new Date());

//Get the time
let timeNow = document.querySelector("#c1-time");
timeNow.innerHTML = currentTime(new Date());

//User searches via search box
let userSearch = document.querySelector("#search-form");
userSearch.addEventListener("submit", searchInput);

//User opts for Geolocation
let userPermission = document.querySelector("#auto-locate-btn");
userPermission.addEventListener("click", userPermissionOK);

//View weather in imperial or metric
let tempUnitChange = document.querySelector("#set-unit-temp-btn");
tempUnitChange.addEventListener("click", newUnits);

//Add Forecase API + Wind to Card 2
//Manually attach forcast to card 2
//Repeat for card3 4 times
