export default function ShortDate(props) {
  let anyDate = props.date;
  let weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let dayofWeek = weekday[anyDate.getDay()];
  let dateOfMonth = anyDate.getDate();

  if (dateOfMonth < 10) {
    return `${dayofWeek} 0${dateOfMonth}`;
  } else {
    return `${dayofWeek} ${dateOfMonth}`;
  }
}
