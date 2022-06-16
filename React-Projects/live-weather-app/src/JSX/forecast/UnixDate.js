export default function UnixDate(props) {
  let weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let futureUnixTime = props.unixstamp;
  let userTime = new Date(futureUnixTime * 1000);
  let futureDay = userTime.getDay();

  let forecastDay = weekday[futureDay];

  let forecastDate = userTime.getDate();

  if (forecastDate < 10) {
    return `${forecastDay} 0${forecastDate}`;
  } else {
    return `${forecastDay} ${forecastDate}`;
  }
}
