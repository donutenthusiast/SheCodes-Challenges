import React from "react";

export default function Footer(props) {
  return (
    <div className="col-12 text-center mt-4">
      <hr />
      <footer>
        <div>
          These results were bought to you by {props.licenseName} (
          <em>
            <a
              className="footer-SO-link"
              target="_blank"
              rel="noopener noreferrer"
              href={props.licenseURL}
            >
              here
            </a>
          </em>
          ) with a lot of help from{" "}
          <a
            className="footer-SO-link"
            target="_blank"
            rel="noopener noreferrer"
            href={props.dictionaryAPI}
          >
            FreeDictionary API
          </a>
          .
        </div>
        <div>
          This Weather App is built using React, hosted with{" "}
          <a
            className="footlink"
            target="_blank"
            rel="noreferrer nopener"
            href="https://www.netlify.com"
          >
            Netlify
          </a>
          , and{" "}
          <strong>
            <a
              className="footlink"
              target="_blank"
              rel="noreferrer noopener"
              href="https://github.com/sylviaintech/SheCodes-Challenges"
            >
              open-source-coded
            </a>{" "}
          </strong>
          by SylviaInTech
        </div>
      </footer>
    </div>
  );
}
