const WebsiteWorkflow = require("../workflows/websiteWorkflow");

const generateWebsite = async (prompt) => {
  return await WebsiteWorkflow.execute(prompt);
};

module.exports = {
  generateWebsite,
};