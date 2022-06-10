import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";

import "./stylingNightMode.css";

import Header from "./JSX/Header";
import Search from "./JSX/Search";
import ForecastIndex from "./JSX/ForecastIndex";
import Footer from "./JSX/Footer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <div className="container">
      <Header />
      <Search />
      <ForecastIndex />
      <Footer />
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
