const RequirementAgent = require("../agents/RequirementAgent");
const PlannerAgent = require("../agents/PlannerAgent");
const FrontendAgent = require("../agents/FrontendAgent");

class WebsiteWorkflow {
  async execute(prompt) {
    const requirementResult = await RequirementAgent.execute(prompt);

    if (requirementResult.status === "error") {
      return requirementResult;
    }

    if (requirementResult.status === "needs_clarification") {
      return requirementResult;
    }

    const projectPlan = await PlannerAgent.execute(
      requirementResult.requirements
    );

    if (projectPlan.status === "error") {
      return projectPlan;
    }

    const frontend = await FrontendAgent.execute(projectPlan);

    if (frontend.status === "error") {
      return frontend;
    }

    return {
      success: true,
      requirements: requirementResult.requirements,
      projectPlan,
      frontend,
    };
  }
}

module.exports = new WebsiteWorkflow();