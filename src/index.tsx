import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import SearchProvider from "./context/SearchContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <SearchProvider>
      <App />
    </SearchProvider>
  </React.StrictMode>
);