import React, {useState} from "react";

import axios from "axios";

import WordResults from "../results/WordResults";

export default function Search(props) {
  const [definition, setDefinition] = useState({});
  const [isloaded, setIsLoaded] = useState(false);
  const [photos, setPhotos] = useState({});
  const [word, setWord] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
    const apiURL = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    axios.get(apiURL).then(displayResults);

    const pexelsKey =
      "563492ad6f91700001000001ed5b77b0a15544f0b55f633e2cb6b3ab";

    const pexelsURL = `https://api.pexels.com/v1/search?query=${word}&per_page=16`;

    axios
      .get(pexelsURL, {headers: {Authorization: `Bearer ${pexelsKey}`}})
      .then(displayImages);
  }

  function displayImages(response) {
    setPhotos(response.data);
  }

  function searchTerm(event) {
    setWord(event.target.value);
  }

  function displayResults(response) {
    setDefinition(response.data);
    setIsLoaded(true);
  }

  if (isloaded) {
    return (
      <div>
        <div className="text-center pb-3 search-form">
          <form>
            <input
              type="text"
              placeholder="Enter a word"
              onChange={searchTerm}
            />{" "}
            <button onClick={handleSubmit}>Submit</button>
          </form>
        </div>
        <WordResults allDefinitions={definition} photos={photos} />
      </div>
    );
  } else {
    return (
      <div className="text-center pb-3 search-form">
        <form>
          <input type="text" placeholder="Enter a word" onChange={searchTerm} />{" "}
          <button onClick={handleSubmit}>Submit</button>
        </form>
      </div>
    );
  }
}
