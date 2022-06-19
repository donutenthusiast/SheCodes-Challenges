import React from "react";

export default function Phoenetic(props) {
  const pronounciation = props.pronounciation;
  const audio = props.speakingExample;

  if (pronounciation && audio) {
    return (
      <div className="results-phonetics">
        <strong>{pronounciation}</strong>{" "}
        {
          // eslint-disable-next-line
          audio.map(function (singleAudio, index) {
            if (singleAudio.audio !== "")
              return (
                <a
                  className="results-phonetics-volume"
                  key={index}
                  target="_blank"
                  rel="noreferrer noopener"
                  href={singleAudio.audio}
                >
                  <i className="fa-solid fa-volume-high"></i>{" "}
                </a>
              );
          })
        }
      </div>
    );
  } else if (pronounciation) {
    return (
      <div className="results-phonetics">
        <strong>{pronounciation}</strong>{" "}
      </div>
    );
  } else if (audio) {
    return (
      <div>
        {
          // eslint-disable-next-line
          audio.map(function (singleAudio, index) {
            return (
              <a
                key={index}
                target="_blank"
                rel="noreferrer noopener"
                href={singleAudio.audio}
              >
                <i className="fa-solid fa-volume-high"></i>
              </a>
            );
          })
        }
      </div>
    );
  } else {
    return null;
  }
}
