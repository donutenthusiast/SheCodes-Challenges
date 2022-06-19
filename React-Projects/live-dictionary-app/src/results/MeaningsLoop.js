import React from "react";
import SynoLoop from "./SynoLoop";

export default function MeaningsLoop(props) {
  if (props) {
    const allSynonyms = props.singleMeaning.synonyms;
    const definition = props.singleMeaning.definitions[0].definition;
    const exampleUse = props.singleMeaning.definitions[0].example;
    const grammar = props.singleMeaning.partOfSpeech;

    return (
      <div>
        <span className="results-sub-headings">
          <em>{grammar}</em>
        </span>
        <div className="results-definitions">
          <strong>{definition}</strong>
        </div>
        <div className="results-examples">{exampleUse}</div>
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
