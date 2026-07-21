const WebsiteOrchestrator = require("../orchestrator/WebsiteOrchestrator");

const generateWebsite = async (prompt) => {
  return await WebsiteOrchestrator.execute(prompt);
};

module.exports = {
  generateWebsite,
};