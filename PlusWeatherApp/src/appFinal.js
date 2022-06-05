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

//Current date
function todaysDate(anyDate) {
  let weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let dayofWeek = weekday[anyDate.getDay()];
  let dateOfMonth = anyDate.getDate();

  if (dateOfMonth < 10) {
    return `${dayofWeek} 0${dateOfMonth}`;
  } else {
    return `${dayofWeek} ${dateOfMonth}`;
  }
}

//Weather calls using city name
function cityNameSearch(cityName) {
  let openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  axios
    .get(openWeatherUrl)
    .catch(function (error) {
      activateDropdown.innerHTML = `We didn't quite catch that! <br/>Please search again and check for typos.`;
      activateDropdown.setAttribute("id", "dropdownError");

      userSearch.addEventListener("keydown", removeDropdown);

      function removeDropdown() {
        document
          .getElementById("dropdownError")
          .setAttribute("id", "searchError");
      }
    })
    .then(getTodaysWeather);
}

function userSearchInput(event) {
  event.preventDefault();

  let cityInput = document.querySelector("#searchInput").value;
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
  let avTemp = response.data.main.temp;
  let feelTemp = response.data.main.feels_like;
  let minTemp = response.data.main.temp_min;
  let maxTemp = response.data.main.temp_max;
  let windSpeed = response.data.wind.speed;

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
  let replaceCountryCode = document.querySelector("#c1Country");
  replaceCountryCode.innerHTML = `${userCountryCode}`;

  let replaceFeelTemp = document.querySelector("#feelTemp");
  replaceFeelTemp.innerHTML = `${Math.round(feelTemp)}`;

  let replaceMainAvTemp = document.querySelector("#c1TempNum");
  replaceMainAvTemp.innerHTML = `${Math.round(avTemp)}`;

  let replaceMainCity = document.querySelector("#c1City");
  replaceMainCity.innerHTML = `${userCity}`;

  let replaceMainDescription = document.querySelector("#c1Descp");
  replaceMainDescription.innerHTML = `${userDescription}`;

  let replaceMainMinTemp = document.querySelector("#c1LowTemp");
  replaceMainMinTemp.innerHTML = `${Math.round(minTemp)}`;

  let replaceMainMaxTemp = document.querySelector("#c1HighTemp");
  replaceMainMaxTemp.innerHTML = `${Math.round(maxTemp)}`;

  let replaceMainSunsrise = document.querySelector("#c1SunUp");
  replaceMainSunsrise.innerHTML = `${timeToLocal(sunUp)}`;

  let replaceMainSunset = document.querySelector("#c1SunDown");
  replaceMainSunset.innerHTML = `${timeToLocal(sunDown)}`;

  let replaceWeatherEmoji = document.querySelector("#c1EmojiWeatherSrc");
  replaceWeatherEmoji.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${weatherEmoji}@2x.png`
  );

  let replaceBackgroundImage = document.querySelector("#backgroundImage");
  replaceBackgroundImage.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${weatherEmoji}@2x.png`
  );

  let replaceWindSpeed = document.querySelector("#c1WindNum");
  replaceWindSpeed.innerHTML = `${Math.round(windSpeed)}`;
}

function getForecast(coordinates) {
  let forecastLat = coordinates.lat;
  let forecastLon = coordinates.lon;
  let forecastURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${forecastLat}&lon=${forecastLon}&exclude=current,minutely,hourly&appid=${apiKey}&units=metric`;
  axios.get(forecastURL).then(showForecast);
}

function showForecast(response) {
  //Daily weather
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
  let replaceTomorrowsWeekday = document.querySelector("#c2Title2Day");
  replaceTomorrowsWeekday.innerHTML = `${tomorrowsWeekday} `;

  let replaceTomorrowsDate = document.querySelector("#c2Title2Date");
  replaceTomorrowsDate.innerHTML = `${tomorrowsDate}`;

  //Replacement for tomorrow's sunrise/sunset
  let replaceTomorrowsSunrise = document.querySelector("#c2SunUp");
  replaceTomorrowsSunrise.innerHTML = `${tomorrowsSunrise}`;

  let replaceTomorrowsSunset = document.querySelector("#c2SunDown");
  replaceTomorrowsSunset.innerHTML = `${tomorrowsSunset}`;

  //Replacement for tomorrows temperatures
  let replaceTomorrowsAvTemp = document.querySelector("#c2-temp-num");
  replaceTomorrowsAvTemp.innerHTML = `${Math.round(tomorrowsAvTemp)}`;

  let replaceTomorrowsMinTemp = document.querySelector("#c2LowTemp");
  replaceTomorrowsMinTemp.innerHTML = `${Math.round(tomorrowsMinTemp)}`;

  let replaceTomorrowsMaxTemp = document.querySelector("#c2HighTemp");
  replaceTomorrowsMaxTemp.innerHTML = `${Math.round(tomorrowsMaxTemp)}`;

  //Replacement for the rest
  let replaceTomorrowsWeatherDescp = document.querySelector("#c2Descp");
  replaceTomorrowsWeatherDescp.innerHTML = `${tomorrowsWeatherDescp}`;

  let replaceTomorrowsWindSpeed = document.querySelector("#c2WindNum");
  replaceTomorrowsWindSpeed.innerHTML = `${Math.round(tomorrowsWindSpeed)}`;

  let replaceTomorrowsWeatherEmoji =
    document.querySelector("#c2EmojiWeatherSrc");
  replaceTomorrowsWeatherEmoji.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${tomorrowsWeatherEmoji}@2x.png`
  );

  //Adding HTML in JS for forecast after tomorrow
  let afterTomorrowInJS = document.querySelector("#afterTomorrowInJS");
  afterTomorrowInJS.innerHTML = ``;

  dayAfter.forEach(function (dayAfter, index) {
    if (index > 1 && index < 5) {
      //Global variables for day after
      let dayAfterAvTemp = dayAfter.temp.day;
      let dayAfterMinTemp = dayAfter.temp.min;
      let dayAfterMaxTemp = dayAfter.temp.max;
      let dayAfterWindSpeed = dayAfter.wind_speed;
      return (afterTomorrowInJS.innerHTML += `
            <div class="card3-small">
              <div class="row" id="card3">
                <div class="col-3">
                  <h5 class="c3-date-title">${forecastDayToLocal(
                    dayAfter.dt
                  )}</h5>
                  <h5 class="c3-date-title">${new Date(
                    dayAfter.dt * 1000
                  ).getDate()}</h5>
                </div>

                <div class="col-2">
                  <h5 id="c3Temp">${Math.round(
                    dayAfterAvTemp
                  )}<span class="unit-temp">°C</span></h5>
                </div>

                <div class="col-1" class="c3-wind-weather-col">
                  <h3 class="c3-emoji-weather">
                    <img
                      class="c3-emoji-weather-src"
                      src="https://openweathermap.org/img/wn/${
                        dayAfter.weather[0].icon
                      }@2x.png"
                    /></h3>
                  <p class="c3-descp"><em>${dayAfter.weather[0].main}</em></p>
                </div>

                <div class="col-2">
                  <h3 class="c3-emoji-wind"
                      ><i class="fa-solid fa-wind"></i
                    ></h3>
                  <p class="c3-wind">
                    <em
                      ><span id="c3WindNum">${Math.round(
                        dayAfterWindSpeed
                      )}</span
                      ><span class="unit-wind"> km/h</span></em
                    >
                </div>

                <div class="col-1" class="c3-high-low-col">
                  <div class="row">
                    <p class="c3-list-high-sun-up">High:</p>
                    <p class="c3-list-high-sun-up">Low:</p>
                  </div>
                </div>

                <div class="col-1" class="c3-high-low-col">
                <div class="row">
                  <p class="c3-list-temp-time" id="c3HighTemp">${Math.round(
                    dayAfterMaxTemp
                  )}<span class="unit-temp">°C</span></p>
                  <p class="c3-list-temp-time" id="c3LowTemp">${Math.round(
                    dayAfterMinTemp
                  )}<span class="unit-temp">°C</span></p>
                </div>
              </div>

              <div class="col-1" class="c3-sun-col">
                <div class="row">
                  <p class="c3-list-high-sun-up">
                    <i class="fa-solid fa-sun"></i
                    ><i class="fa-solid fa-arrow-up"></i>:
                  </p>
                    <p class="c3-list-high-sun-up">
                    <i class="fa-solid fa-sun"></i
                    ><i class="fa-solid fa-arrow-down"></i>:
                  </p>
                </div>
              </div>

              <div class="col-1" class="c3-sun-col">
                <div class="row">
                  <p class="c3-list-temp-time" class="c3-sun-up">${timeToLocal(
                    dayAfter.sunrise
                  )}</p>
                  <p class="c3-list-temp-time" class="c3-sun-down">${timeToLocal(
                    dayAfter.sunset
                  )}</p>
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
  let userTime = new Date(futureUnixTime * 1000);
  let weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let tomorrow = userTime.getDay();
  let forecastDay = weekday[tomorrow];

  return forecastDay;
}

//Night and day mode styling
function userStylesheet(title) {
  //get CSS files
  let css = `link[rel="night stylesheet"]`;
  let allStylesheets = document.querySelectorAll(css);

  //disable the other CSS files
  allStylesheets.forEach((inactiveFile) => (inactiveFile.disabled = true));

  //chosen file to activate
  let selector = `link[title="${title}"]`;
  let chosenStylesheet = document.querySelector(selector);
  chosenStylesheet.disabled = false;
}

function nightOff() {
  userStylesheet("DayModeCSS");
}

function nightOn() {
  userStylesheet("NightModeCSS");
}

//Api key
const apiKey = "cd2317fe4740983ade94670ca1806f44";

//default location on page load
cityNameSearch("London");

//Get todays date
let today = document.querySelector("#c1Date");
today.innerHTML = todaysDate(new Date());

//Get the current time
let timeNow = document.querySelector("#c1Time");
timeNow.innerHTML = currentTime(new Date());

//User searches via search box
let userSearch = document.querySelector("#searchForm");
userSearch.addEventListener("submit", userSearchInput);

//In case of errors
let activateDropdown = document.querySelector("#searchError");

//User opts for Geolocation
let userPermission = document.querySelector("#autoLocateBtn");
userPermission.addEventListener("click", userPermissionOK);

//User opts for night or day mode
let toggleModeNight = document.getElementById("nightMode");
toggleModeNight.addEventListener("click", nightOn);

let toggleModeDay = document.getElementById("dayMode");
toggleModeDay.addEventListener("click", nightOff);
