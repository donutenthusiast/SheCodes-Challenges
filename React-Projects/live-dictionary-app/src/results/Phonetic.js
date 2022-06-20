import React from "react";

export default function Phoenetic(props) {
  const pronunciation = props.pronunciation;
  const audio = props.speakingExample;

  if (pronunciation && audio) {
    return (
      <div className="results-phonetics">
        <strong>{pronunciation}</strong>{" "}
        <div>
          {
            // eslint-disable-next-line
            audio.map(function (singleAudio, index) {
              if (singleAudio.audio !== "")
                return (
                  <span key={index}>
                    <a
                      className="results-phonetics-volume"
                      target="_blank"
                      rel="noreferrer noopener"
                      href={singleAudio.audio}
                    >
                      <i className="fa-solid fa-volume-high"></i>{" "}
                    </a>

                    <span className="results-phonetics-volume-subtitle">
                      <em>{singleAudio.text}</em>
                    </span>
                    {"    "}
                  </span>
                );
            })
          }
        </div>
      </div>
    );
  } else if (pronunciation) {
    return (
      <div className="results-phonetics">
        <strong>{pronunciation}</strong>{" "}
      </div>
    );
  } else if (audio) {
    return (
      <div className="results-phonetics">
        {
          // eslint-disable-next-line
          audio.map(function (singleAudio, index) {
            if (singleAudio.audio !== "")
              return (
                <span key={index}>
                  <a
                    className="results-phonetics-volume"
                    target="_blank"
                    rel="noreferrer noopener"
                    href={singleAudio.audio}
                  >
                    <i className="fa-solid fa-volume-high"></i>{" "}
                  </a>

                  <span className="results-phonetics-volume-subtitle">
                    <em>{singleAudio.text}</em>
                  </span>
                  {"    "}
                </span>
              );
          })
        }
      </div>
    );
  } else {
    return null;
  }
}
