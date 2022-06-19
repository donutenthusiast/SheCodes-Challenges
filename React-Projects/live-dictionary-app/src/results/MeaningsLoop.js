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
          <div className="results-sub-headings">
            <em>similar words:</em>
          </div>
          <ul className="results-synonyms-list">
            {
              // eslint-disable-next-line
              allSynonyms.map(function (singleSynonym, index) {
                if (index < 7)
                  return (
                    <span key={index} className="results-synonym-each">
                      <em>
                        <SynoLoop synonym={singleSynonym} />
                      </em>
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
