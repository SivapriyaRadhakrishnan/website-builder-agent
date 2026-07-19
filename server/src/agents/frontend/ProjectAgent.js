const BaseAgent = require("../BaseAgent");
const llmService = require("../../services/llmService");

class ProjectAgent extends BaseAgent {
  constructor() {
    super("ProjectAgent");
  }

  async execute(projectPlan) {
    return {
      projectName: projectPlan.projectName,

      folders: [
        "src",
        "src/components",
        "src/pages",
        "src/assets",
        "public"
      ]
    };
  }
}

module.exports = new ProjectAgent();