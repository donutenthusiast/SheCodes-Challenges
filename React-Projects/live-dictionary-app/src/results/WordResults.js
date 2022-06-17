import React from "react";

export default function WordResults(props) {
  console.log(props.allDefinitions);

  const dictionaryAPI = "https://dictionaryapi.dev/";
  const licenseName = props.allDefinitions.allResults[0].license.name;
  const licenseURL = props.allDefinitions.allResults[0].license.url;

  const grammarType =
    props.allDefinitions.allResults[0].meanings[0].partOfSpeech;
  const listenGB = `${props.allDefinitions.allResults[0].phonetics[0].audio}`;
  const listenUS = `${props.allDefinitions.allResults[0].phonetics[1].audio}`;
  const phonetics = props.allDefinitions.allResults[0].phonetic;
  const word = props.allDefinitions.allResults[0].word;

  return (
    <div>
      The word you are looking for is: {word} and pronouced as: {phonetics}
      <br />
      This is a: {grammarType}
      <br />
      Listen to some examples on how to pronouce the word in:{" "}
      <a target="_blank" rel="noreferrer noopener" href={listenGB}>
        UK English
      </a>{" "}
      or{" "}
      <a target="_blank" rel="noopener noreferrer" href={listenUS}>
        US English
      </a>
      <br />
      These results were bought to you by {licenseName} (
      <em>
        more info at{" "}
        <a target="_blank" rel="noopener noreferrer" href={licenseURL}>
          this URL
        </a>
      </em>
      ) with a lot of help from FreeDictionaryAPI{" "}
      <a target="_blank" rel="noopener noreferrer" href={dictionaryAPI}>
        this URL
      </a>
    </div>
  );
}
