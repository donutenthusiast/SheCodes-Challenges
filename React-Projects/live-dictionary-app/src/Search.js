import React, {useState} from "react";

import "./Search.css";

export default function Search() {
  const [word, setWord] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    alert(`Searching for your word: ${word}`);
  }

  function searchTerm(event) {
    setWord(event.target.value);
  }

  return (
    <div className="text-center pb-3 search-form">
      <form>
        <input type="text" placeholder="Enter a word" onChange={searchTerm} />{" "}
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
}
