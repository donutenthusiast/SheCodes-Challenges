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
  axios.get(openWeatherUrl).then(getTodaysWeather);
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

  axios.get(geoWeatherUrl).then(getTodaysWeather);
}

//API response + Inner HTML updates
function getTodaysWeather(response) {
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
  //Reused the most in this function
  let dayAfter = response.data.daily;

  //Tomorrow's date
  let tommorowsUnixTime = dayAfter[1].dt;
  let tomorrowsWeekday = forecastDayToLocal(tommorowsUnixTime);

  // Date part from the timestamp
  let tomorrowsDate = new Date(tommorowsUnixTime * 1000).getDate();

  //Tomorrows sun up and down
  let tomorrowsSunrise = timeToLocal(dayAfter[1].sunrise);
  let tomorrowsSunset = timeToLocal(dayAfter[1].sunset);

  //Tomorrow's temperatures
  tomorrowsAvTemp = dayAfter[1].temp.day;
  tomorrowsMinTemp = dayAfter[1].temp.min;
  tomorrowsMaxTemp = dayAfter[1].temp.max;

  //Tomorrows weather description, emoji, wind
  let tomorrowsWeatherDescp = dayAfter[1].weather[0].description;
  tomorrowsWeatherDescp =
    tomorrowsWeatherDescp[0].toUpperCase() + tomorrowsWeatherDescp.substring(1);
  //can also style from CSS "element:first letter {text transform: capitlize}

  let tomorrowsWeatherEmoji = dayAfter[1].weather[0].icon;
  tomorrowsWindSpeed = dayAfter[1].wind_speed;

  //Replacement for tomorrow's date
  let replaceTomorrowsWeekday = document.querySelector("#c2-title2-day");
  replaceTomorrowsWeekday.innerHTML = `${tomorrowsWeekday} `;

  let replaceTomorrowsDate = document.querySelector("#c2-title2-date");
  replaceTomorrowsDate.innerHTML = `${tomorrowsDate}`;

  //Replacement for tomorrow's sunrise/sunset
  let replaceTomorrowsSunrise = document.querySelector("#c2-sun-up");
  replaceTomorrowsSunrise.innerHTML = `${tomorrowsSunrise}`;

  let replaceTomorrowsSunset = document.querySelector("#c2-sun-down");
  replaceTomorrowsSunset.innerHTML = `${tomorrowsSunset}`;

  //Replacement for tomorrows temperatures
  let replaceTomorrowsAvTemp = document.querySelector("#c2-temp-num");
  replaceTomorrowsAvTemp.innerHTML = `${Math.round(tomorrowsAvTemp)}`;

  let replaceTomorrowsMinTemp = document.querySelector("#c2-low-temp");
  replaceTomorrowsMinTemp.innerHTML = `${Math.round(tomorrowsMinTemp)}`;

  let replaceTomorrowsMaxTemp = document.querySelector("#c2-high-temp");
  replaceTomorrowsMaxTemp.innerHTML = `${Math.round(tomorrowsMaxTemp)}`;

  //Replacement for the rest
  let replaceTomorrowsWeatherDescp = document.querySelector("#c2-descp");
  replaceTomorrowsWeatherDescp.innerHTML = `${tomorrowsWeatherDescp}`;

  let replaceTomorrowsWindSpeed = document.querySelector("#c2-wind-num");
  replaceTomorrowsWindSpeed.innerHTML = `${Math.round(tomorrowsWindSpeed)}`;

  let replaceTomorrowsWeatherEmoji = document.querySelector(
    "#c2-emoji-weather-src"
  );
  replaceTomorrowsWeatherEmoji.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${tomorrowsWeatherEmoji}@2x.png`
  );

  //Adding HTML in JS for forecast after tomorrow
  let afterTomorrowInJS = document.querySelector("#afterTomorrowInJS");
  afterTomorrowInJS.innerHTML = ``;

  dayAfter.forEach(function (dayAfter, index) {
    if (index > 1 && index < 5) {
      return (afterTomorrowInJS.innerHTML += `
      
      <div class="col-12">
            <div class="card3Small" class="card h-200">
              <div class="row">
                <div class="col-2" id="card3-col-2">
                  <h5 class="c3DateTitle">${forecastDayToLocal(
                    dayAfter.dt
                  )}</h5>
                  <h5 class="c3DateTitle">${new Date(
                    dayAfter.dt * 1000
                  ).getDate()}</h5>
                </div>

                <div class="col-2">
                  <h5 class="c3Temp">${Math.round(
                    dayAfter.temp.day
                  )}<span class="unitTemp">°C</span></h5>
                </div>

                <div class="col-1" class="c3WindWeatherCol">
                  <h3 class="c3EmojiWeather">
                    <img
                      class="c3EmojiWeatherSrc"
                      src="https://openweathermap.org/img/wn/${
                        dayAfter.weather[0].icon
                      }@2x.png"
                    /></h3>
                  <p class="c3Descp"><em>${dayAfter.weather[0].main}</em></p>
                </div>

                <div class="col-2">
                  <h3 class="c3EmojiWind"
                      ><i class="fa-solid fa-wind"></i
                    ></h3>
                  <p class="c3Wind">
                    <em
                      ><span class="c3WindNum">${Math.round(
                        dayAfter.wind_speed
                      )}</span
                      ><span class="unitWind"> Km/h</span></em
                    >
                </div>

                <div class="col-1" class="c3HighLowCol">
                  <div class="row">
                    <p class="c3ListHighSunup">High:</p>
                    <p class="c3ListHighSunup">Low:</p>
                  </div>
                </div>

                <div class="col-1" class="c3HighLowCol">
                <div class="row">
                  <p class="c3ListTempTime" class="c3HighTemp">${Math.round(
                    dayAfter.temp.max
                  )}<span class="unitTemp">°C</span></p>
                  <p class="c3ListTempTime" class="c3LowTemp">${Math.round(
                    dayAfter.temp.min
                  )}<span class="unitTemp">°C</span></p>
                </div>
              </div>

              <div class="col-1" class="c3SunCol">
                <div class="row">
                  <p class="c3ListHighSunup">
                    <i class="fa-solid fa-sun"></i
                    ><i class="fa-solid fa-arrow-up"></i>:
                  </p>
                    <p class="c3ListHighSunup">
                    <i class="fa-solid fa-sun"></i
                    ><i class="fa-solid fa-arrow-down"></i>:
                  </p>
                </div>
              </div>

              <div class="col-1" class="c3SunCol">
                <div class="row">
                  <p class="c3ListTempTime" class="c3SunUp">${timeToLocal(
                    dayAfter.sunrise
                  )}</p>
                  <p class="c3ListTempTime" class="c3SunDown">${timeToLocal(
                    dayAfter.sunset
                  )}</p>
                </div>
              </div>

            </div>
          </div>
        </div>`);
      //Final closing div for the forecast columns is in HTML index file after the last span
    }
  });
}

//Unix time conversion
function timeToLocal(input) {
  let unixTime = input;
  //convert to UTC timestamp
  let userTime = new Date(unixTime * 1000);
  let hh = userTime.getHours();
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
  //convert to UTC timestamp
  let userTime = new Date(futureUnixTime * 1000);
  let weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let tomorrow = userTime.getDay();
  let forecastDay = weekday[tomorrow];

  return forecastDay;
}

//Imperial to metric calculations
function newUnits() {
  //Button
  let buttonText = document.querySelector("#set-unit-temp-btn");

  //Today
  let oldAvTemp = document.querySelector("#c1-temp-num");
  let oldFeelTemp = document.querySelector("#feel-temp");
  let oldMainMinTemp = document.querySelector("#c1-low-temp");
  let oldMainMaxTemp = document.querySelector("#c1-high-temp");
  let oldC1WindSpeed = document.querySelector("#c1-wind-num");

  //Tomorrow
  let oldC2AvTemp = document.querySelector("#c2-temp-num");
  let oldC2MainMinTemp = document.querySelector("#c2-low-temp");
  let oldC2MainMaxTemp = document.querySelector("#c2-high-temp");
  let oldC2WindSpeed = document.querySelector("#c2-wind-num");

  if (buttonText.textContent === "View Weather in Imperial Units") {
    return (
      //Button
      (buttonText.innerHTML = `View Weather in Metric Units`),
      //Today
      (oldAvTemp.innerHTML = `${Math.round((avTemp * 9) / 5 + 32)}`),
      (oldFeelTemp.innerHTML = `${Math.round((feelTemp * 9) / 5 + 32)}`),
      (oldMainMinTemp.innerHTML = `${Math.round((minTemp * 9) / 5 + 32)}`),
      (oldMainMaxTemp.innerHTML = `${Math.round((maxTemp * 9) / 5 + 32)}`),
      (oldC1WindSpeed.innerHTML = `${Math.round(windSpeed * 0.62137119)}`),
      //Tommorow
      (oldC2AvTemp.innerHTML = `${Math.round((tomorrowsAvTemp * 9) / 5 + 32)}`),
      (oldC2MainMinTemp.innerHTML = `${Math.round(
        (tomorrowsMinTemp * 9) / 5 + 32
      )}`),
      (oldC2MainMaxTemp.innerHTML = `${Math.round(
        (tomorrowsMaxTemp * 9) / 5 + 32
      )}`),
      (oldC2WindSpeed.innerHTML = `${Math.round(
        tomorrowsWindSpeed * 0.62137119
      )}`),
      //Units
      allUnitsImperial()
    );
  } else {
    return (
      //Button
      (buttonText.innerHTML = `View Weather in Imperial Units`),
      //Today
      (oldAvTemp.innerHTML = `${Math.round(avTemp)}`),
      (oldFeelTemp.innerHTML = `${Math.round(feelTemp)}`),
      (oldMainMinTemp.innerHTML = `${Math.round(minTemp)}`),
      (oldMainMaxTemp.innerHTML = `${Math.round(maxTemp)}`),
      (oldC1WindSpeed.innerHTML = `${Math.round(windSpeed)}`),
      //Tomorrow
      (oldC2AvTemp.innerHTML = `${Math.round(tomorrowsAvTemp)}`),
      (oldC2MainMinTemp.innerHTML = `${Math.round(tomorrowsMinTemp)}`),
      (oldC2MainMaxTemp.innerHTML = `${Math.round(tomorrowsMaxTemp)}`),
      (oldC2WindSpeed.innerHTML = `${Math.round(tomorrowsWindSpeed)}`),
      //Units
      allUnitsMetric()
    );
  }
}

//Units texts to imperial
function allUnitsImperial() {
  let allTempUnits = document.querySelectorAll(".unitTemp");

  for (i = 0; i < allTempUnits.length; i++) {
    allTempUnits[i].innerHTML = `°F`;
  }

  let windUnits = document.querySelectorAll(".unitWind");

  for (i = 0; i < windUnits.length; i++) {
    windUnits[i].innerHTML = ` M/h`;
  }
}

//Unit texts to metric
function allUnitsMetric() {
  let allTempUnits = document.querySelectorAll(".unitTemp");

  for (i = 0; i < allTempUnits.length; i++) {
    allTempUnits[i].innerHTML = `°C`;
  }

  let windUnits = document.querySelectorAll(".unitWind");

  for (i = 0; i < windUnits.length; i++) {
    windUnits[i].innerHTML = ` Km/h`;
  }
}

//Api key
const apiKey = "cd2317fe4740983ade94670ca1806f44";

//Global variables
let avTemp = null;
let feelTemp = null;
let minTemp = null;
let maxTemp = null;
let windSpeed = null;
let tomorrowsAvTemp = null;
let tomorrowsMinTemp = null;
let tomorrowsMaxTemp = null;
let tomorrowsWindSpeed = null;

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
