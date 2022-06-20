import React from "react";

import Footer from "../Footer";

import MeaningsLoop from "./MeaningsLoop";

import Pexels from "./Pexels";

import Phoenetic from "./Phonetic";

export default function WordResults(props) {
  const results = props.allDefinitions;
  const allPhotos = props.photos;

  if (results !== null) {
    const dictionaryAPI = "https://dictionaryapi.dev/";
    const licenseName = results.license.name;
    const licenseURL = results.license.url;
    const allMeanings = results.meanings;

    const pronunciation = results.phonetic;
    const speakingExample = results.phonetics;
    const word = results.word;
    return (
      <div className="py-3 px-4 results">
        <div className="results-search-word">{word}</div>
        {""}
        <Phoenetic
          pronunciation={pronunciation}
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
        <Pexels allPhotos={allPhotos} />
        <Footer
          dictionaryAPI={dictionaryAPI}
          licenseName={licenseName}
          licenseURL={licenseURL}
        />
      </div>
    );
  } else {
    return <div className="col-12 text-center loading">Loading...</div>;
  }
}
