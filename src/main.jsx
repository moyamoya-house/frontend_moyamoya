import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { UIProvider } from "@yamada-ui/react";
import customTheme from "./Theme";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UIProvider theme={customTheme}>
      <App />
    </UIProvider>
  </React.StrictMode>
);
