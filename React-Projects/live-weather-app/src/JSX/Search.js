import React from "react";

export default function Search() {
  return (
    <div className="row search-location">
      <div className="col-1" id="inlineBtns"></div>
      <div className="col-11">
        <form id="searchForm">
          <input
            type="text"
            placeholder="Enter the name of a city"
            id="searchInput"
          />
          <button type="submit" className="btn btn-secondary" id="searchBtn">
            Search
          </button>
          <button
            className="btn btn-secondary"
            type="button"
            id="autoLocateBtn"
          >
            <div id="searchError"></div>
            <i className="fa-solid fa-location-crosshairs"></i> Locate Me
          </button>
        </form>
      </div>
    </div>
  );
}
