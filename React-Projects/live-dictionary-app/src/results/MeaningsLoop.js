import React from "react";
import SynoLoop from "./SynoLoop";

export default function MeaningsLoop(props) {
  if (props) {
    console.log(props.singleMeaning);
    const allSynonyms = props.singleMeaning.synonyms;

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
        <div>
          <ul>
            {
              // eslint-disable-next-line
              allSynonyms.map(function (singleSynonym, index) {
                if (index < 6)
                  return (
                    <span key={index}>
                      <SynoLoop synonym={singleSynonym} />
                    </span>
                  );
              })
            }
          </ul>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
