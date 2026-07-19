const BaseAgent = require("../BaseAgent");
const llmService = require("../../services/llmService");

class PageAgent extends BaseAgent {
  constructor() {
    super("PageAgent");
  }

  async execute(projectPlan, page) {
const { title, componentName, fileName, route } = page;
const prompt = `
You are a Senior React 19 Frontend Engineer.

Generate ONLY the React page:

Title: ${title}

Component Name: ${componentName}

File Name: ${fileName}

Route: ${route}

Project Plan:

${JSON.stringify(projectPlan, null, 2)}

Available Components:

${projectPlan.components.join(", ")}

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

import { Container } from "@tailwind/css";

====================================================
REACT RULES
====================================================

- React 19
- Functional component only
- Default export
- No BrowserRouter
- No createRoot
- No routing
- No App.jsx
- No main.jsx
====================================================
PAGE METADATA
====================================================

Use the following metadata:

Title: ${title}

Component Name: ${componentName}

File Name: ${fileName}

Route: ${route}

Rules:

- The React component function MUST be named:
  ${componentName}

- The default export MUST be:
  ${componentName}

- Any visible page heading should use:
  "${title}"

- Never use "${title}" as a React component name if it contains spaces.

- Never invent another component name.
====================================================
PAGE RULES
====================================================

Generate ONLY the page component:

${componentName}

The purpose of this page is NOT to recreate sections.

The purpose of this page is to import and compose reusable components together.

The generated page should contain very little custom markup.

Most of the UI must come from imported components.

The page title displayed to users should be:

${title}

Do NOT generate:

- App.jsx
- main.jsx
- Reusable components

Import reusable components ONLY from:

../components/

Always use default imports.

Example:

import Navbar from "../components/Navbar";

Never use named imports.

Import ONLY components that exist in:

${projectPlan.components.join(", ")}

If Navbar is not in the list,
do not import Navbar.

If Footer is not in the list,
do not import Footer.

====================================================
PAGE COMPOSITION RULES
====================================================

The primary responsibility of this page is to COMPOSE reusable components.

Do NOT build the entire page using custom JSX.

Instead, assemble the page using the reusable components generated for this project.


Use ONLY the components that exist in:

${projectPlan.components.join(", ")}

Compose the page in the following order whenever the components exist:

1. Navbar
2. HeroSection
3. FeatureCard
4. StatsSection
5. Gallery
6. Testimonial
7. PricingCard
8. FAQSection
9. CTASection
10. Newsletter
11. ContactForm
12. Footer

Rules:

- Import ONLY components that are relevant to this page.
- Never import components that are unrelated to this page.
- Render every imported component exactly once.
- Never recreate a section if a reusable component already exists.
- Keep custom JSX to a minimum.
- The page should mainly assemble reusable components.
- Use semantic HTML.
- Wrap the page inside a <main> element.

Example imports:

import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";

Always use DEFAULT imports.

Never use named imports.

Never import from another folder.

Example page:

function ${componentName}() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <Footer />
    </main>
  );
}

export default ${componentName};

export default ${componentName};
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

- React
- React hooks (if needed)
- Existing project components
- react-icons (if needed)

Every import MUST exist in package.json.

====================================================
OUTPUT RULES
====================================================

Return ONLY valid React source code.

No markdown.

No explanation.

No JSON.
====================================================
HOME PAGE RULES
====================================================

If this page is "Home":

Always render:

Navbar (if available)

HeroSection (if available)

FeatureCard (if available)

StatsSection (if available)

Gallery (if available)

Testimonial (if available)

PricingCard (if available)

FAQSection (if available)

CTASection (if available)

Newsletter (if available)

ContactForm (if available)

Footer (if available)

The Home page should resemble a modern landing page.

Do NOT generate placeholder content such as:

<h1>Home</h1>

<p>Welcome to our website.</p>

Instead, compose the page using the available reusable components.
====================================================
SELF VALIDATION
====================================================

Before returning the code verify:

✓ No @tailwind/css

✓ No @chakra-ui/react

✓ No Container

✓ No Flex

✓ No Grid

✓ No Box

✓ No Stack

✓ No Text

✓ No Button

✓ No Link
✓ All available reusable components are imported.

✓ The page is primarily composed of reusable components.

✓ Navbar is rendered if available.

✓ Footer is rendered if available.

✓ The page does not consist only of a heading and paragraph.

✓ The Home page uses reusable components whenever they are available.

✓ Function name is exactly:

${componentName}

✓ Default export is exactly:

${componentName}
✓ All imported components exist in projectPlan.components.

✓ No component is imported from any folder except "../components/".

✓ The page composes reusable components instead of recreating them.

✓ The generated page should resemble a production-ready landing page.
If any of these exist,
rewrite the page using ONLY HTML elements.

Return ONLY the final React source code.
`;

    const code = await llmService.generate(prompt);

    return code;
  }
}

module.exports = new PageAgent();