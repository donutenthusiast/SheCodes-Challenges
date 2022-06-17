import React from "react";

import Footer from "../Footer";

import MeaningsLoop from "./MeaningsLoop";

export default function WordResults(props) {
  console.log(props.allDefinitions);
  //allDefinitions=response.data;
  const results = props.allDefinitions[0];
  //
  const dictionaryAPI = "https://dictionaryapi.dev/";
  const licenseName = results.license.name;
  const licenseURL = results.license.url;

  const allMeanings = results.meanings[0].definitions;

  const grammarType = results.meanings[0].partOfSpeech;
  const listenGB = `${results.phonetics[0].audio}`;
  //doesn't always show and breaks the site! Create a new component and rtn if not true return nothing?
  //const listenUS = `${results.phonetics[1].audio}`;
  //URL text <a target="_blank" rel="noopener noreferrer" href={listenUS}>
  //US English
  //</a>
  //end

  const phonetics = results.phonetic;
  const word = results.word;

  return (
    <div>
      The word you are looking for is: <strong>{word}</strong>
      {""} (
      <em>
        <strong>{phonetics}</strong>{" "}
        <a target="_blank" rel="noreferrer noopener" href={listenGB}>
          UK English
        </a>
      </em>
      )
      <br />
      <strong>{grammarType}</strong>
      <br />
      <div>
        {
          // eslint-disable-next-line
          allMeanings.map(function (meaning, index) {
            if (index < 4) return <MeaningsLoop singleMeaning={meaning} />;
          })
        }
      </div>
      <Footer
        dictionaryAPI={dictionaryAPI}
        licenseName={licenseName}
        licenseURL={licenseURL}
      />
    </div>
  );
}
