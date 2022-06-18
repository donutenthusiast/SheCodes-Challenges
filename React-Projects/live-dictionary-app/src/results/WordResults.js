import React from "react";

import Footer from "../Footer";

import MeaningsLoop from "./MeaningsLoop";

export default function WordResults(props) {
  if (props) {
    console.log(props.allDefinitions);
    //allDefinitions=response.data;
    const results = props.allDefinitions[0];
    //
    const dictionaryAPI = "https://dictionaryapi.dev/";
    const licenseName = results.license.name;
    const licenseURL = results.license.url;
    const allMeanings = results.meanings;

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
      <div className="py-3 px-4 results">
        <div className="results-search-word">{word}</div>
        {""}
        <span className="results-phonetics">
          <em>
            <strong>{phonetics}</strong>{" "}
            <a target="_blank" rel="noreferrer noopener" href={listenGB}>
              <i class="fa-solid fa-file-audio"></i>
            </a>
          </em>
        </span>
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
