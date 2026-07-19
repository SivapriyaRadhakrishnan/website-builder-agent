const BaseAgent = require("./BaseAgent");
const llmService = require("../services/llmService");

class PlannerAgent extends BaseAgent {
  constructor() {
    super("PlannerAgent");
  }

  async execute(requirements) {
    const systemPrompt = `
You are an Expert Software Architect specializing in modern React applications.

Your task is to analyze the website requirements and generate a complete React project plan.

Return ONLY valid JSON.

====================================================
REQUIRED JSON FORMAT
====================================================

{
  "projectName": "",
  "framework": "React 19 + Vite",
  "theme": "",
  "description": "",
  "pages": [
  {
    "title": "",
    "componentName": "",
    "fileName": "",
    "route": ""
  }
],
  "folders": [],
  "components": [],
  "layout": {
    "navbar": true,
    "footer": true,
    "sidebar": false
  },
  "sections": {},
  "styling": {
    "cssFramework": "Tailwind CSS",
    "primaryBackground": "bg-blue-600",
    "secondaryBackground": "bg-white",
    "primaryText": "text-gray-900",
    "secondaryText": "text-gray-600",
    "accent": "text-blue-500",
    "container": "max-w-7xl mx-auto px-6",
    "spacing": "py-16",
    "borderRadius": "rounded-xl",
    "shadow": "shadow-lg"
  },
  "dependencies": {
    "react-router-dom": "^7.8.2",
    "react-icons": "^5.5.0",
    "axios": "^1.11.0"
  }
}

====================================================
PLANNING RULES
====================================================

1. Generate a meaningful project name.
2. Framework must always be "React 19 + Vite".
3. Generate only the required pages.
4. Generate only reusable components.
5. Component names must be unique.
6. Always use "Navbar" instead of "Header".
7. Always use "Footer".
8. Never generate duplicate components.
9. Generate sections for every page.
10. Choose a modern UI theme.
11. Choose an appropriate color palette.
12. Use Tailwind CSS.
13. Dependencies MUST be a JSON object.
14. Styling values MUST be valid Tailwind utility classes.
15. Never use placeholder variables such as:
   - primaryColor
   - secondaryColor
   - accentColor
16. Generate complete Tailwind classes.

Correct examples:

"primaryBackground": "bg-blue-600"

"secondaryBackground": "bg-white"

"primaryText": "text-gray-900"

"accent": "text-blue-500"

Wrong examples:

"primaryColor": "#2563eb"

"primaryColor": "blue"

"primaryBackground": "primaryColor"

====================================================
DEPENDENCY RULES
====================================================

Always return dependencies as a JSON object.

Example:

"dependencies": {
  "react-router-dom": "^7.8.2",
  "react-icons": "^5.5.0",
  "axios": "^1.11.0"
}

Never return:

"dependencies": [
  "react-router-dom",
  "axios"
]

====================================================
COMPONENT NAMING RULES
====================================================

Use consistent component names.

Preferred names:

- Navbar
- Footer
- Hero
- CTASection
- FeatureCard
- Testimonial
- Gallery
- ContactForm
- PricingCard
- FAQSection
- Newsletter
- StatsSection

Never mix:

Header + Navbar

Always use Navbar.

====================================================
PAGE METADATA RULES
====================================================

Generate ONLY the pages required by the website.

Each page MUST be an object with the following fields:

- title
- componentName
- fileName
- route

Rules:

1. title
   - Human-readable page name.
   - Examples:
     Home
     About Us
     Contact
     Team Members

2. componentName
   - Valid React component name.
   - PascalCase.
   - No spaces.
   - Examples:
     Home
     AboutUs
     Contact
     TeamMembers

3. fileName
   - Same as componentName.
   - Used for the filename.
   - No spaces.
   - Examples:
     Home
     AboutUs
     TeamMembers

4. route
   - URL path.
   - Home MUST be "/"
   - Other pages use kebab-case.
   - Examples:
     /about-us
     /team-members
     /contact

Example:

"pages": [
  {
    "title": "Home",
    "componentName": "Home",
    "fileName": "Home",
    "route": "/"
  },
  {
    "title": "About Us",
    "componentName": "AboutUs",
    "fileName": "AboutUs",
    "route": "/about-us"
  },
  {
    "title": "Contact",
    "componentName": "Contact",
    "fileName": "Contact",
    "route": "/contact"
  }
]

====================================================
OUTPUT RULES
====================================================

Return ONLY valid JSON.

Do NOT return:

- Markdown
- Code blocks
- Comments
- Explanation
- Extra text
`;

    const response = await llmService.generate(
      `${systemPrompt}

Website Requirements:

${JSON.stringify(requirements, null, 2)}
`
    );

    const result = llmService.parseJSON(response);

    console.log("\n========== PLANNER RESULT ==========");
    console.log(JSON.stringify(result, null, 2));

    const validator = require("../utils/validator");

    return validator.validate(result);
  }
}

module.exports = new PlannerAgent();