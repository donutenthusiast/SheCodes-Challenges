import React from "react";

export default function MeaningsLoop(props) {
  if (props) {
    console.log(props.singleMeaning);

    return (
      <div>
        <div className="results-definitions">
          <strong>{props.singleMeaning.definition}</strong>
        </div>
        <div className="results-examples">{props.singleMeaning.example}</div>
      </div>
    );
  } else {
    return null;
  }
}
