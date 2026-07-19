const BaseAgent = require("../BaseAgent");
const llmService = require("../../services/llmService");

class AppAgent extends BaseAgent {
  constructor() {
    super("AppAgent");
  }

  async execute(projectPlan) {

    const pageMetadata = projectPlan.pages
  .map(
    (page) => `
Title: ${page.title}
Component: ${page.componentName}
File: ${page.fileName}
Route: ${page.route}
`
  )
  .join("\n");
 const prompt = `
You are a Senior React 19 Frontend Engineer.

Your task is to generate ONLY the file:

src/App.jsx

Project Plan:

${JSON.stringify(projectPlan, null, 2)}

Available Pages:

${pageMetadata}

====================================================
GENERAL RULES
====================================================

- Return ONLY valid React source code.
- No markdown.
- No JSON.
- No explanation.
- No comments outside the code.
- The file must compile successfully.

====================================================
REACT RULES
====================================================

- Use React 19.
- Use Functional Components only.
- Export default App.
- Do NOT use class components.
- Do NOT use ReactDOM.render().
- Do NOT use createRoot().

====================================================
ROUTER RULES
====================================================

Use ONLY:

import { Routes, Route } from "react-router-dom";

BrowserRouter is ALREADY configured inside:

src/main.jsx

Therefore:

- NEVER import BrowserRouter.
- NEVER create BrowserRouter.
- NEVER wrap Routes with BrowserRouter.
- NEVER use Switch.
- NEVER use exact.
- NEVER use component={}.
- ALWAYS use:

<Route path="/" element={<Home />} />

====================================================
PAGE IMPORT RULES
====================================================

Pages are located inside:

src/pages

Import every page using DEFAULT imports.

Example:

import Home from "./pages/Home";
import About from "./pages/About";

Never use:

import { Home } from "./pages/Home";

Never create page components inside App.jsx.

ROUTE GENERATION

====================================================
CODE QUALITY
====================================================

Generate clean production-ready React code.

Do not include unnecessary fragments.

Do not include unused imports.

Generate only:

- imports
- App component
- Routes

Nothing else.

====================================================
FINAL CHECK
====================================================

Before generating verify:

✔ Every import uses page.fileName

✔ Every imported component uses page.componentName

✔ Every Route uses page.route

✔ BrowserRouter is NOT imported

✔ Valid React 19 syntax

✔ No invented filenames

✔ No invented routes

✔ No invented component names

Return ONLY the React source code.
`;

    const code = await llmService.generate(prompt);

    return code.trim();
  }
}

module.exports = new AppAgent();