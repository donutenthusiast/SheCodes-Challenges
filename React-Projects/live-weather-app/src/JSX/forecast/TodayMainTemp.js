import React, {useState} from "react";

export default function TodayMainTemp(props) {
  const [unit, setNewUnit] = useState("metric");

  function convertToImperial(event) {
    event.preventDefault();
    setNewUnit("imperial");
  }

  function convertToMetric(event) {
    event.preventDefault();
    setNewUnit("metric");
  }

  if (unit === "metric") {
    return (
      <span>
        <span id="c1TempNum">{Math.round(props.temp)}</span>
        <span className="unit-temp">
          °C|°
          <a href="/" onClick={convertToImperial}>
            F
          </a>
        </span>
      </span>
    );
  } else if (unit === "imperial") {
    return (
      <span>
        <span id="c1TempNum">{Math.round(props.temp * (9 / 5) + 32)}</span>
        <span className="unit-temp">
          °F|°
          <a href="/" onClick={convertToMetric}>
            C
          </a>
        </span>
      </span>
    );
  }
}
