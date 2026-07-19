const BaseAgent = require("../BaseAgent");

class PackageAgent extends BaseAgent {
  constructor() {
    super("PackageAgent");
  }

  async execute(projectPlan) {
    const plannerDependencies =
      projectPlan.dependencies &&
      !Array.isArray(projectPlan.dependencies)
        ? projectPlan.dependencies
        : {};

    return {
      name:
        projectPlan.projectName
          ?.toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "") || "react-app",

      version: "1.0.0",
      private: true,
      type: "module",

      scripts: {
        dev: "vite",
        build: "vite build",
        preview: "vite preview"
      },

      dependencies: {
        react: "^19.2.0",
        "react-dom": "^19.2.0",
        "react-router-dom": "^7.8.2",
        axios: "^1.11.0",
        "react-icons": "^5.5.0",

        ...plannerDependencies
      },

      devDependencies: {
        vite: "^7.1.0",
        "@vitejs/plugin-react": "^5.0.2",

        tailwindcss: "^4.1.12",
        "@tailwindcss/vite": "^4.1.12"
      }
    };
  }
}

module.exports = new PackageAgent();