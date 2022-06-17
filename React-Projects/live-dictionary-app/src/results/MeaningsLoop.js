import React from "react";

export default function MeaningsLoop(props) {
  console.log(props.singleMeaning);

  return (
    <div>
      <span>
        Definition: {""}
        <strong>{props.singleMeaning.definition}</strong>
      </span>
      <br />
      <span>
        <em>{props.singleMeaning.example}</em>
      </span>
    </div>
  );
}
