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
  console.log(response);
  //Values for global variables
  avTemp = response.data.main.temp;
  feelTemp = response.data.main.feels_like;
  minTemp = response.data.main.temp_min;
  maxTemp = response.data.main.temp_max;
  windSpeed = response.data.wind.speed;

  //New variables
  let userCity = response.data.name;

  let userCountryCode = response.data.sys.country;

  let userDescription = response.data.weather[0].description;
  userDescription =
    userDescription[0].toUpperCase() + userDescription.substring(1);
  //can also style the text from CSS
  //for all letters "element {text transform: capitlize}"
  //for first letter "element:first letter {text transform: capitlize}

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

  let replaceWeatherEmoji = document.querySelector("#c1-emoji-weather");
  replaceWeatherEmoji.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${weatherEmoji}@2x.png`
  );

  let replaceWindSpeed = document.querySelector("#c1-wind-num");
  replaceWindSpeed.innerHTML = `${Math.round(windSpeed)}`;
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

//°F to °C conversion
function newUnitText() {
  let buttonText = document.querySelector("#set-unit-temp-btn");
  let oldAvTemp = document.querySelector("#c1-temp-num");
  let oldFeelTemp = document.querySelector("#feel-temp");
  let oldMainMinTemp = document.querySelector("#c1-low-temp");
  let oldMainMaxTemp = document.querySelector("#c1-high-temp");

  if (buttonText.textContent == "View in °F") {
    return (
      (buttonText.innerHTML = `View in °C`),
      (oldAvTemp.innerHTML = `${Math.round((avTemp * 9) / 5 + 32)}`),
      (oldFeelTemp.innerHTML = `${Math.round((feelTemp * 9) / 5 + 32)}`),
      (oldMainMinTemp.innerHTML = `${Math.round((minTemp * 9) / 5 + 32)}`),
      (oldMainMaxTemp.innerHTML = `${Math.round((maxTemp * 9) / 5 + 32)}`),
      allUnitsInF()
    );
  } else {
    return (
      (buttonText.innerHTML = `View in °F`),
      (oldAvTemp.innerHTML = `${Math.round(avTemp)}`),
      (oldFeelTemp.innerHTML = `${Math.round(feelTemp)}`),
      (oldMainMinTemp.innerHTML = `${Math.round(minTemp)}`),
      (oldMainMaxTemp.innerHTML = `${Math.round(maxTemp)}`),
      allUnitsInC()
    );
  }
}

function allUnitsInF() {
  let allUnits = document.querySelectorAll(".unitTemp");
  let i;
  for (i = 0; i < allUnits.length; i++) {
    allUnits[i].innerHTML = `°F`;
  }
}

function allUnitsInC() {
  let allUnits = document.querySelectorAll(".unitTemp");
  let i;
  for (i = 0; i < allUnits.length; i++) {
    allUnits[i].innerHTML = `°C`;
  }
}

let apiKey = "cd2317fe4740983ade94670ca1806f44";

let avTemp = null;
let feelTemp = null;
let minTemp = null;
let maxTemp = null;
let windSpeed = null;

//Initially did not work as I put let WITHIN the function!!
cityNameSearch("London");

let today = document.querySelector("#c1-date");
today.innerHTML = shortDate(new Date());

let timeNow = document.querySelector("#c1-time");
timeNow.innerHTML = currentTime(new Date());

let userSearch = document.querySelector("#search-form");
userSearch.addEventListener("submit", searchInput);

let userPermission = document.querySelector("#auto-locate-btn");
userPermission.addEventListener("click", userPermissionOK);

let tempUnitChange = document.querySelector("#set-unit-temp-btn");
tempUnitChange.addEventListener("click", newUnitText);
