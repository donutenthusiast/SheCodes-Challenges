import React, {useState} from "react";

import axios from "axios";

import "./Search.css";

export default function Search() {
  const [isloaded, setIsLoaded] = useState(false);
  const [word, setWord] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const apiURL = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    axios.get(apiURL).then(displayResults);
  }

  function searchTerm(event) {
    setWord(event.target.value);
  }

  function displayResults(response) {
    console.log(response.data);
    setIsLoaded(true);
  }

  if (isloaded) {
    return (
      <div className="text-center pb-3 search-form">
        <form>
          <input type="text" placeholder="Enter a word" onChange={searchTerm} />{" "}
          <button onClick={handleSubmit}>Submit</button>
        </form>
        <p>The word you are looking for is {word}</p>
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
