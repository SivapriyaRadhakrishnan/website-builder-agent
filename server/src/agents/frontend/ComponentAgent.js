const BaseAgent = require("../BaseAgent");
const llmService = require("../../services/llmService");

class ComponentAgent extends BaseAgent {
  constructor() {
    super("ComponentAgent");
  }

  async execute(projectPlan, component) {

  const { name, fileName, route } = component;

 const prompt = `
You are a Senior React 19 Frontend Engineer.

Generate ONLY the reusable React component.

Component Name:

${name}

File Name:

${fileName}

Used In Route:

${route}

Project Plan:

${JSON.stringify(projectPlan, null, 2)}

====================================================
CRITICAL RULES (MUST FOLLOW)
====================================================

The generated code MUST compile successfully.

If ANY rule below is violated, your answer is WRONG.

1. Use ONLY native HTML elements.

Allowed HTML tags:

div
section
header
main
footer
nav
article
aside
button
a
img
h1
h2
h3
h4
h5
h6
p
span
ul
ol
li
form
label
input
textarea
select

2. NEVER generate ANY of these:

Container
Flex
Grid
Box
Stack
Row
Column
Text
Button
Link
Card
View
Pressable
TouchableOpacity

3. NEVER import ANY of these:

@tailwind/css
tailwindcss
@tailwindcss
@chakra-ui/react
chakra-ui
material-ui
@mui/material
antd
semantic-ui-react
bootstrap
react-bootstrap

4. NEVER invent libraries.

Do NOT create imports that do not exist.

5. Tailwind CSS is ONLY utility classes.

Correct:

<div className="max-w-7xl mx-auto px-6 py-16">

Correct:

<div className="flex items-center justify-between gap-6">

Wrong:

<Container>

Wrong:

<Flex>

Wrong:

<Text>

Wrong:

<Button>

Wrong:

import { Container } from "@tailwind/css";

====================================================
REACT RULES
====================================================

- React 19
- Functional component only
- Default export
- No class components
- No BrowserRouter
- No createRoot
- No routing
- No App.jsx
- No main.jsx
====================================================
COMPONENT METADATA
====================================================

Component Name:

${name}

File Name:

${fileName}

Route:

${route}

Rules:

- The React function MUST be named exactly:

${name}

- The default export MUST be:

${name}

- Never rename the component.

- Never generate another component name.

- If the component name is HeroSection,
the function must be:

const HeroSection = () => { ... }

export default HeroSection;

- If the component name is Footer,
the function must be Footer.

- If the component name is Navbar,
the function must be Navbar.
====================================================
COMPONENT RULES
====================================================

Generate ONLY:

${name}

Do not generate:

- Pages
- App.jsx
- main.jsx
- Other components

The component should:

- Be reusable
- Receive props where appropriate
- Use semantic HTML
- Use accessibility attributes
- Be responsive
====================================================
COMPONENT RULES
====================================================

Generate ONLY:

${name}

Do not generate:

- Pages
- App.jsx
- main.jsx
- Other components

The component should:

- Be reusable
- Receive props where appropriate
- Use semantic HTML
- Use accessibility attributes
- Be responsive

====================================================
COMPONENT DESIGN GUIDELINES
====================================================

Generate production-ready, modern UI components.

General Requirements:

- Modern and clean appearance
- Fully responsive
- Consistent spacing
- Attractive typography
- Rounded corners where appropriate
- Soft shadows for cards
- Smooth hover animations
- Professional layout
- Follow modern UI/UX principles

Use:

- max-w-7xl mx-auto
- px-6
- py-16
- gap-6
- rounded-xl
- shadow-lg
- hover:shadow-xl
- transition
- duration-300

The design should feel similar to a production landing page.

If componentName is "Navbar":

- Brand logo or name
- Navigation links
- CTA button
- Modern horizontal layout
- Mobile-friendly

If componentName is "HeroSection":

- Large headline
- Supporting description
- Primary CTA button
- Secondary CTA button (optional)
- Large vertical spacing
- Attractive layout
- Optional image placeholder
- Professional landing page style

If componentName is "FeatureCard":

- Icon (react-icons if available)
- Title
- Description
- Rounded card
- Shadow
- Hover effect

If componentName is "Gallery":

- Responsive image grid
- Rounded images
- Hover effect

If componentName is "Footer":

- Brand
- Navigation links
- Contact information
- Copyright text


====================================================
TAILWIND RULES
====================================================

Use Tailwind ONLY through className.

Example:

<div className="flex items-center justify-between px-6 py-12">

Use utilities like:

flex
grid
gap-4
gap-6
rounded-xl
shadow-lg
hover:
transition
duration-300
max-w-7xl
mx-auto
px-6
py-12
text-center
bg-white
bg-blue-600
text-gray-900
text-gray-600

Do NOT use:

- CSS files
- CSS Modules
- Styled Components
- Emotion
- Inline styles

====================================================
IMPORT RULES
====================================================

Only import:

- React (if needed)
- React hooks (if needed)
- Existing project components
- react-icons (if needed)

Do NOT import anything else.

Every import MUST exist in package.json.

====================================================
OUTPUT RULES
====================================================

Return ONLY valid React source code.

No markdown.

No explanation.

No JSON.

====================================================
SELF VALIDATION
====================================================

Before returning the code, verify:

There is NO:

Container

Flex

Grid

Box

Stack

Text

Button

Link

✓ Function name is exactly:

${name}

✓ Default export is exactly:

${name}

✓ The component name matches the planner metadata.

@tailwind/css

@chakra-ui/react

If ANY of these exist, rewrite the component using ONLY HTML elements.

Return ONLY the final React component.
`;
    const code = await llmService.generate(prompt);

    return code;
  }
}

module.exports = new ComponentAgent();