export default function LocalTime(props) {
  let date = props.currentDate;
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
