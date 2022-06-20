import React from "react";

export default function Footer(props) {
  if (props) {
    return (
      <div className="col-12 text-center mt-4">
        <hr />
        <footer>
          <div>
            The dictionary results were bought to you by{" "}
            <i className="fa-brands fa-creative-commons"></i>{" "}
            <a
              className="footer-SO-link"
              target="_blank"
              rel="noopener noreferrer"
              href={props.licenseURL}
            >
              {props.licenseName}
            </a>{" "}
            with a lot of help from{" "}
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
            <a
              className="footer-SO-link"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.pexels.com"
            >
              Photos provided by Pexels
            </a>
            <br />
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.pexels.com"
            >
              <img
                className="pexels"
                alt="Pexels logo in black"
                src="https://images.pexels.com/lib/api/pexels.png"
              />
            </a>
          </div>
          <div>
            This Weather App is built using React{" "}
            <i className="fa-brands fa-react"></i>, hosted with{" "}
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
  } else {
    return (
      <div className="col-12 text-center loading">
        This footer is loading...
      </div>
    );
  }
}
