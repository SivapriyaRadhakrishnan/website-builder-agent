const BaseAgent = require("../BaseAgent");

class MainAgent extends BaseAgent {
  constructor() {
    super("MainAgent");
  }

  async execute() {
    return `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);`;
  }
}

module.exports = new MainAgent();