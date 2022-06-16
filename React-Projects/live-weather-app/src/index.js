import React from "react";
import ReactDOM from "react-dom/client";

import "./stylingNightMode.css";

import Header from "./JSX/Header";
import Search from "./JSX/Search";
import Footer from "./JSX/Footer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <div className="container">
      <Header />
      <Search />
      <Footer />
    </div>
  </React.StrictMode>
);
