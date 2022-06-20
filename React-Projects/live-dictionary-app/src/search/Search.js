import React, {useState} from "react";

import axios from "axios";

import WordResults from "../results/WordResults";

export default function Search(props) {
  const [definition, setDefinition] = useState(null);
  const [isloaded, setIsLoaded] = useState(false);

  const [photos, setPhotos] = useState([]);

  const [word, setWord] = useState(props.wordOnLoad);

  const [errorWord, setErrorWord] = useState("");
  const [errorImage, setErrorImage] = useState("");

  function whenPageLoads() {
    setIsLoaded(true);
    axiosSearch();
  }

  function axiosSearch() {
    const pexelsKey =
      "563492ad6f91700001000001ed5b77b0a15544f0b55f633e2cb6b3ab";
    const pexelsURL = `https://api.pexels.com/v1/search?query=${word}&per_page=9`;

    //https://api.dictionaryapi.dev/api/v2/entries/en/
    const apiURL = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    axios
      .get(apiURL)
      .then(displayDictionaryResults)
      .catch((errorWord) => {
        if (errorWord) {
          setErrorWord(
            `...Actually there's a problem with the word search: "${errorWord.message}" Please try again and check for typos.`
          );
        }
      });

    axios
      .get(pexelsURL, {headers: {Authorization: `Bearer ${pexelsKey}`}})
      .then(displayImages)
      .catch((errorImage) => {
        if (errorImage) {
          setErrorImage(
            `...Actually there's a problem with the image search: "${errorImage.message}"`
          );
        }
      });
  }

  function handleSubmit(event) {
    event.preventDefault();
    axiosSearch();
  }

  function searchTerm(event) {
    setWord(event.target.value);
  }

  function displayDictionaryResults(response) {
    setDefinition(response.data[0]);
    setErrorWord("");
  }

  function displayImages(response) {
    setPhotos(response.data.photos);
    setErrorImage("");
  }

  if (isloaded === true) {
    return (
      <div>
        <div className="text-center pb-3 search-form">
          <form onSubmit={handleSubmit}>
            <input
              type="search"
              placeholder="Enter a word"
              defaultValue={props.wordOnLoad}
              onChange={searchTerm}
            />{" "}
            <button>Search</button>
          </form>
          <div className="col-12 text-center pt-4 pb-2">
            {errorWord} {errorImage}
          </div>
        </div>
        <WordResults allDefinitions={definition} photos={photos} />
      </div>
    );
  } else {
    whenPageLoads();
    return (
      <div className="col-12 text-center loading">
        Loading...
        <div>
          {errorWord} {errorImage}
        </div>
      </div>
    );
  }
}
