export default function UnixTime(props) {
  let unixTime = props.time;
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
