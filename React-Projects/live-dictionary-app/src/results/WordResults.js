import React from "react";

import Footer from "../Footer";

import MeaningsLoop from "./MeaningsLoop";

import Pexels from "./Pexels";

import Phoenetic from "./Phonetic";

export default function WordResults(props) {
  if (props) {
    //allDefinitions=response.data;
    const results = props.allDefinitions[0];

    const dictionaryAPI = "https://dictionaryapi.dev/";
    const licenseName = results.license.name;
    const licenseURL = results.license.url;
    const allMeanings = results.meanings;

    const pronounciation = results.phonetic;
    const speakingExample = results.phonetics;
    const word = results.word;

    return (
      <div className="py-3 px-4 results">
        <div className="results-search-word">{word}</div>
        {""}
        <Phoenetic
          pronounciation={pronounciation}
          speakingExample={speakingExample}
        />
        <br />
        <span className="results-sub-headings">definition(s):</span>
        <div>
          {
            // eslint-disable-next-line
            allMeanings.map(function (meaning, index) {
              if (index < 4)
                return (
                  <span key={index}>
                    <MeaningsLoop singleMeaning={meaning} />
                  </span>
                );
            })
          }
        </div>
        <div>
          <Pexels allPhotos={props.photos} />
        </div>
        <Footer
          dictionaryAPI={dictionaryAPI}
          licenseName={licenseName}
          licenseURL={licenseURL}
        />
      </div>
    );
  } else {
    return null;
  }
}
