import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "./fonts/ProximaNovaFont.otf";
// import "antd/dist/antd.css";
import { SpotifyProvider } from "./context/SpotifyContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SpotifyProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </SpotifyProvider>
);
