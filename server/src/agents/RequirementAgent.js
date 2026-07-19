const BaseAgent = require("./BaseAgent");
const llmService = require("../services/llmService");

class RequirementAgent extends BaseAgent {
  constructor() {
    super("RequirementAgent");
  }

  async execute(prompt) {
    const systemPrompt = `
You are a Website Requirement Analysis Agent.

Analyze the user's request.

If information is missing, return JSON like:

{
  "status": "needs_clarification",
  "questions": [
    "...",
    "..."
  ]
}

If enough information exists, return JSON like:

{
  "status": "complete",
  "requirements": {
    "websiteType": "",
    "framework": "",
    "theme": "",
    "pages": [],
    "features": [],
    "backendRequired": false
  }
}

Rules:
- Return ONLY valid JSON.
- Do NOT use markdown.
- Do NOT explain anything.
- If the website type is known, suggest suitable pages and features.
`;

    const response = await llmService.generate(
`${systemPrompt}

User Request:
${prompt}`
    );

    const result = llmService.parseJSON(response);

const validator = require("../utils/validator"); // adjust path if needed

return validator.validate(result);
  }
}

module.exports = new RequirementAgent();