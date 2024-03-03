import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BanditProvider } from "./context/BanditContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BanditProvider>
      <App />
    </BanditProvider>
  </React.StrictMode>
);
