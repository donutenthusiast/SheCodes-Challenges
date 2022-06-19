import React from "react";

export default function Pexels(props) {
  if (props) {
    return (
      <div>
        <hr />
        <div className="row">
          {
            // eslint-disable-next-line
            props.allPhotos.photos.map(function (singlePhoto, index) {
              const imgAlt = singlePhoto.alt;
              const imgAuthor = singlePhoto.photographer;
              const imgPreviewURL = singlePhoto.src.medium;
              const imgURL = singlePhoto.url;
              const fullAlt = `Description: ${imgAlt}. Photo taken by: ${imgAuthor}`;

              return (
                <div
                  key={index}
                  className="col-sm-4 d-flex align-items-center justify-content-center p-3"
                >
                  <a
                    className="results-photos-preview"
                    target="_blank"
                    rel="noreferrer noopener"
                    href={imgURL}
                  >
                    <img
                      className="img-fluid rounded"
                      alt={fullAlt}
                      src={imgPreviewURL}
                    />
                  </a>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
}
