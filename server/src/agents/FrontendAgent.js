const BaseAgent = require("./BaseAgent");

const ProjectAgent = require("./frontend/ProjectAgent");
const PackageAgent = require("./frontend/PackageAgent");
const MainAgent = require("./frontend/MainAgent");
const AppAgent = require("./frontend/AppAgent");
const ComponentAgent = require("./frontend/ComponentAgent");
const PageAgent = require("./frontend/PageAgent");
const HtmlAgent = require("./frontend/HtmlAgent");
const ViteConfigAgent = require("./frontend/ViteConfigAgent");

const CurrentProject = require("../config/currentProject");
const FileWriterService = require("../services/FileWriterService");

class FrontendAgent extends BaseAgent {
  constructor() {
    super("FrontendAgent");
  }

  // =============================
  // Validate Generated React Code
  // =============================
  validateGeneratedCode(code, fileName) {
    const forbiddenPatterns = [
      "@tailwind/css",
      "@chakra-ui/react",
      "@mui/material",
      "material-ui",
      "react-bootstrap",
      "semantic-ui-react",
      "<Container",
      "<Flex",
      "<Grid",
      "<Box",
      "<Stack",
      "<Text",
      "<Row",
      "<Column",
      "<View",
      "<Card",
      "import { Container",
      "import { Flex",
      "import { Grid",
      "import { Box",
    ];

    const found = forbiddenPatterns.find((pattern) =>
      code.includes(pattern)
    );

    if (found) {
      throw new Error(
        `❌ Invalid code generated in ${fileName}. Forbidden pattern: ${found}`
      );
    }

    return true;
  }

  async execute(projectPlan) {
    // =============================
    // Project Structure
    // =============================
    const structure = await ProjectAgent.execute(projectPlan);

    console.log("\n========== PROJECT ==========");
    console.log(structure);

    const projectPath = FileWriterService.createProject(
      structure.projectName
    );

    CurrentProject.set(projectPath);

    for (const folder of structure.folders) {
      FileWriterService.createDirectory(projectPath, folder);
    }

    // =============================
    // package.json
    // =============================
    const packageFile = await PackageAgent.execute(projectPlan);

    console.log("\n========== PACKAGE ==========");
    console.log(packageFile);

    FileWriterService.writeFile(
      projectPath,
      "package.json",
      JSON.stringify(packageFile, null, 2)
    );

    // =============================
    // index.html
    // =============================
    const htmlCode = await HtmlAgent.execute();

    console.log("\n========== INDEX.HTML ==========");
    console.log(htmlCode);

    FileWriterService.writeFile(
      projectPath,
      "index.html",
      htmlCode
    );

    // =============================
    // vite.config.js
    // =============================
    const viteConfig = await ViteConfigAgent.execute();

    console.log("\n========== VITE CONFIG ==========");
    console.log(viteConfig);

    FileWriterService.writeFile(
      projectPath,
      "vite.config.js",
      viteConfig
    );

    // =============================
    // src/main.jsx
    // =============================
    const mainCode = await MainAgent.execute();

    console.log("\n========== MAIN ==========");
    console.log(mainCode);

    FileWriterService.writeFile(
      projectPath,
      "src/main.jsx",
      mainCode
    );

    // =============================
    // src/index.css
    // =============================
    FileWriterService.writeFile(
      projectPath,
      "src/index.css",
      `@import "tailwindcss";\n`
    );

    // =============================
    // src/App.jsx
    // =============================
    const appCode = await AppAgent.execute(projectPlan);

    console.log("\n========== APP ==========");
    console.log(appCode);

    FileWriterService.writeFile(
      projectPath,
      "src/App.jsx",
      appCode
    );

    // =============================
    // Components
    // =============================
    console.log("\n========== PROJECT PLAN COMPONENTS ==========");
console.log(projectPlan.components);
    for (const component of projectPlan.components) {

  console.log("Generating component:", component.name);

  const componentCode = await ComponentAgent.execute(
    projectPlan,
    component
  );

  this.validateGeneratedCode(
    componentCode,
    `Component: ${component.name}`
  );

  console.log(`\n========== COMPONENT : ${component.name} ==========`);

  FileWriterService.writeFile(
    projectPath,
    `src/components/${component.name}.jsx`,
    componentCode
  );
}

   // =============================
// Pages
// =============================

console.log("\n========== PROJECT PLAN PAGES ==========");
console.log(projectPlan.pages);
for (const page of projectPlan.pages) {

  const pageCode = await PageAgent.execute(
    projectPlan,
    page
  );

  // Validate generated page
  this.validateGeneratedCode(
    pageCode,
    `Page: ${page.componentName}`
  );

  console.log(
    `\n========== PAGE : ${page.componentName} ==========`
  );

  FileWriterService.writeFile(
    projectPath,
    `src/pages/${page.fileName}.jsx`,
    pageCode
  );
}
    return {
      success: true,
      projectPath,
      message: "Frontend project generated successfully.",
    };
  }
}

module.exports = new FrontendAgent();