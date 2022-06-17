import React from "react";

export default function Footer(props) {
  return (
    <div className="col-12 text-center mt-4">
      <footer>
        These results were bought to you by {props.licenseName} (
        <em>
          more info at{" "}
          <a target="_blank" rel="noopener noreferrer" href={props.licenseURL}>
            this URL
          </a>
        </em>
        ) with a lot of help from FreeDictionaryAPI{" "}
        <a target="_blank" rel="noopener noreferrer" href={props.dictionaryAPI}>
          this URL
        </a>
      </footer>
    </div>
  );
}
