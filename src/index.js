import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "./fonts/ProximaNovaFont.otf";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";

// import "antd/dist/antd.css";
import { SpotifyProvider } from "./context/SpotifyContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SpotifyProvider>
      <Router>
        <App />
      </Router>
    </SpotifyProvider>
  </React.StrictMode>
);
