import React from "react";

export default function MeaningsLoop(props) {
  if (props) {
    console.log(props.singleMeaning);

    return (
      <div>
        <span className="results-sub-headings">
          <em>{props.singleMeaning.partOfSpeech}</em>
        </span>
        <div className="results-definitions">
          <strong>{props.singleMeaning.definitions[0].definition}</strong>
        </div>
        <div className="results-examples">
          {props.singleMeaning.definitions[0].example}
        </div>
      </div>
    );
  } else {
    return null;
  }
}
