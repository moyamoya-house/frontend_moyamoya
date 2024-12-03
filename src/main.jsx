import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { UIProvider } from "@yamada-ui/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UIProvider>
      <App />
    </UIProvider>
  </React.StrictMode>
);
