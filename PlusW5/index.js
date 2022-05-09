//This week's code from line 60
////////////////////////////////////////////////////////////////
//Last week - display current date and time
let date = new Date();

let weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

//Last week - update date
function shortDate(anyDate) {
  let dayofWeek = weekday[anyDate.getDay()];
  let dateOfMonth = anyDate.getDate();

  if (dateOfMonth < 10) {
    return `${dayofWeek} 0${dateOfMonth}`;
  } else {
    return `${dayofWeek} ${dateOfMonth}`;
  }
}

let updateDate = document.querySelector("#c1Date");
updateDate.innerHTML = shortDate(new Date());

//Last week - Update time
function currentTime(twentyFourHours) {
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

//Last week - innerHTML
let updateTime = document.querySelector("#c1Time");
updateTime.innerHTML = currentTime(new Date());

//////////////////////////////////////////////////////////////

//Button to convert temp unit NB - doesn't work with live numbers yet

function newUnit() {
  let buttonText = document.querySelector("#set-unit-temp-btn");

  if (buttonText.textContent === "View in °F") {
    alert(`Feature coming soon`);
  }
}

let unitChange = document.querySelector("#set-unit-temp-btn");
unitChange.addEventListener("click", newUnit);

//////////////////////////////////////////////////////////////////////////////

//Challenge 1 - Search engine, that displays results in the page

let apiKey = "cd2317fe4740983ade94670ca1806f44";
let unitC = "metric";
let unitF = "imperial";
defaultLocation();

function defaultLocation() {
  let defaultCity = `London`;
  let openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${defaultCity}&appid=${apiKey}&units=${unitC}`;
  axios.get(openWeatherUrl).then(getUserWeather);
}

function userSearchWeather(event) {
  event.preventDefault();

  let cityInput = document.querySelector("#search-input");

  if (cityInput.value != "") {
    let openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=${unitC}`;
    axios.get(openWeatherUrl).then(getUserWeather);
  } else {
    alert(`Enter a city name to search for the weather.`);
  }
}

function getUserWeather(response) {
  //API calls
  let userCity = response.data.name;

  let userCountryCode = response.data.sys.country;

  let userDescription = response.data.weather[0].description;
  userDescription =
    userDescription[0].toUpperCase() + userDescription.substring(1);

  let avTemp = Math.round(response.data.main.temp);

  let feelTemp = Math.round(response.data.main.feels_like);

  let minTemp = Math.round(response.data.main.temp_min);

  let maxTemp = Math.round(response.data.main.temp_max);

  let sunUp = response.data.sys.sunrise;

  let sunDown = response.data.sys.sunset;

  //Unix time conversion
  function timeToLocal(input) {
    let unixTime = input;
    //convert to UTC timestamp
    let userTime = new Date(unixTime * 1000);
    //console.log(userTime);
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

  //InnerHTML text replacements in the large card

  let replaceCountryCode = document.querySelector("#c1Country");
  replaceCountryCode.innerHTML = `${userCountryCode}`;

  let replaceFeelTemp = document.querySelector("#feelTemp");
  replaceFeelTemp.innerHTML = `${feelTemp}`;

  let replaceMainAvTemp = document.querySelector("#temp-num1");
  replaceMainAvTemp.innerHTML = `${avTemp}`;

  let replaceMainCity = document.querySelector("#c1City");
  replaceMainCity.innerHTML = `${userCity}`;

  let replaceMainDescription = document.querySelector("#c1Descp");
  replaceMainDescription.innerHTML = `${userDescription}`;

  let replaceMainMinTemp = document.querySelector("#c1-low-temp");
  replaceMainMinTemp.innerHTML = `${minTemp}`;

  let replaceMainMaxTemp = document.querySelector("#c1-high-temp");
  replaceMainMaxTemp.innerHTML = `${maxTemp}`;

  let replaceMainSunsrise = document.querySelector("#c1-sun-up");
  replaceMainSunsrise.innerHTML = `${timeToLocal(sunUp)}`;

  let replaceMainSunset = document.querySelector("#c1-sun-down");
  replaceMainSunset.innerHTML = `${timeToLocal(sunDown)}`;
}

let userSearch = document.querySelector("#search-form");
userSearch.addEventListener("submit", userSearchWeather);

//🙀 Bonus - add a Current Location button + display results in page

function userPermissionOK() {
  return navigator.geolocation.getCurrentPosition(userAcceptsGeolocation);
}

function userAcceptsGeolocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let geoWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unitC}`;

  axios.get(geoWeatherUrl).then(getUserWeather);
}

let userPermission = document.querySelector("#auto-locate-btn");
userPermission.addEventListener("click", userPermissionOK);
