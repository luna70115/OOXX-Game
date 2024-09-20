import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.scss";
import "./_variable.scss"
import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);