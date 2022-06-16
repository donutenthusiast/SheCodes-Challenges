import clearDay from "..//icons/design/fill/animation-ready/clear-day.svg";
import overcastDay from "../icons/design/fill/animation-ready/overcast-day.svg";
import cloudyDay from "../icons/design/fill/animation-ready/cloudy-day.svg";
import drizzleDay from "../icons/design/fill/animation-ready/drizzle.svg";
import rainDay from "../icons/design/fill/animation-ready/rain.svg";
import thunderstormsDayRain from "../icons/design/fill/animation-ready/thunderstorms-day-rain.svg";
import snowDay from "../icons/design/fill/animation-ready/snow.svg";
import mistDay from "../icons/design/fill/animation-ready/mist.svg";

//Night - lined
import clearNight from "../icons/design/line/animation-ready/clear-night.svg";
import overcastNight from "../icons/design/line/animation-ready/overcast-night.svg";
import cloudyNight from "../icons/design/line/animation-ready/cloudy.svg";
import drizzleNight from "../icons/design/line/animation-ready/drizzle.svg";
import rainNight from "../icons/design/line/animation-ready/rain.svg";
import thunderstormsNightRain from "../icons/design/line/animation-ready/thunderstorms-night-rain.svg";
import snowNight from "../icons/design/line/animation-ready/snow.svg";
import mistNight from "../icons/design/line/animation-ready/mist.svg";

const iconMapping = {
  "01d": clearDay,
  "01n": clearNight,
  "02d": overcastDay,
  "02n": overcastNight,
  "03d": cloudyDay,
  "03n": cloudyNight,
  "04d": overcastDay,
  "04n": overcastNight,
  "09d": drizzleDay,
  "09n": drizzleNight,
  "10d": rainDay,
  "10n": rainNight,
  "11d": thunderstormsDayRain,
  "11n": thunderstormsNightRain,
  "13d": snowDay,
  "13n": snowNight,
  "50d": mistDay,
  "50n": mistNight,
};

const WeatherIcon = (props) => (
  <img
    className={props.className}
    id={props.id}
    src={iconMapping[props.code]}
    alt="Dynamic emoji representative of the day's weather"
  />
);

export default WeatherIcon;
