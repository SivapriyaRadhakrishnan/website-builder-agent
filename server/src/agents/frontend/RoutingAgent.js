const BaseAgent = require("../BaseAgent");
const llmService = require("../../services/llmService");

class RoutingAgent extends BaseAgent {
  constructor() {
    super("RoutingAgent");
  }

  async execute(projectPlan, fileName) {
    const prompt = `
You are a Senior React 19 + Vite Developer.

Generate ONLY this file:

${fileName}

Project Details:

${JSON.stringify(projectPlan, null, 2)}

Requirements:

- Use React 19.
- Use Vite.
- Use JavaScript only.
- Use React functional components.
- Use React Router DOM v7.
- Never use ReactDOM.render().
- Never use Switch.
- Never use component={} or exact.
- Use createRoot() only inside src/main.jsx.
- App.jsx MUST export default App.
- src/App.jsx must NOT call createRoot() or ReactDOM.render().
- Return ONLY valid source code.
- No markdown.
- No JSON.
- No explanation.

Special Rules:

If generating src/main.jsx:
- Import createRoot from "react-dom/client".
- Import BrowserRouter.
- Import App from "./App".
- Render <App /> inside BrowserRouter.

If generating src/App.jsx:
- Export default App.
- Configure routes using Routes and Route.
`;

    const code = await llmService.generate(prompt);

    return code.trim();
  }
}

module.exports = new RoutingAgent();