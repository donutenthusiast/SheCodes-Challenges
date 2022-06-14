import React from "react";

export default function Footer() {
  return (
    <div className="col-12">
      <footer>
        <em>
          Weather Icons (Meteocons){" "}
          <a
            className="footLink"
            target="blank"
            rel="noreferrer noopener"
            href="https://github.com/basmilius/weather-icons"
          >
            by Bas Milius
          </a>
        </em>
        <br />
        <br />
        This Weather App is built using React and{" "}
        <strong>
          <a
            className="footLink"
            target="_blank"
            rel="noreferrer noopener"
            href="https://github.com/sylviaintech/SheCodes-Challenges"
          >
            open source coded {""}
          </a>
        </strong>
        by SylviaInTech
      </footer>
    </div>
  );
}
