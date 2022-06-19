import React from "react";

export default function Pexels(props) {
  console.log(props.allPhotos);
  if (props.allPhotos) {
    return (
      <div className="row">
        {props.allPhotos.photos.map(function (singlePhoto, index) {
          const imgAlt = singlePhoto.alt;
          const imgAuthor = singlePhoto.photographer;
          const imgAuthorURL = singlePhoto.photographer_url;
          const imgPreviewURL = singlePhoto.src.medium;
          const imgURL = singlePhoto.url;

          return (
            <div key={index} className="col-3">
              <a target="_blank" rel="noreferrer noopener" href={imgURL}>
                <img className="img-fluid" alt={imgAlt} src={imgPreviewURL} />
              </a>
              <p>
                <em>
                  Photo by{" "}
                  <a
                    target="_blank"
                    rel="noreferrer noopener"
                    href={imgAuthorURL}
                  >
                    {imgAuthor}
                  </a>
                </em>
              </p>
            </div>
          );
        })}
      </div>
    );
  } else {
    return null;
  }
}
