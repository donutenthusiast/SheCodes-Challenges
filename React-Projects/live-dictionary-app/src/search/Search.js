import React, {useState} from "react";

import axios from "axios";

import "./Search.css";

import WordResults from "../results/WordResults";

export default function Search() {
  const [isloaded, setIsLoaded] = useState(false);
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState({});

  function handleSubmit(event) {
    event.preventDefault();
    const apiURL = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    axios.get(apiURL).then(displayResults);
  }

  function searchTerm(event) {
    setWord(event.target.value);
  }

  function displayResults(response) {
    console.log(response.data[0]);
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
        <WordResults allDefinitions={definition} />
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
