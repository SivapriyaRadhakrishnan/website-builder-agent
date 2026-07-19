const llm = require("./src/services/llmService");

(async () => {
  const result = await llm.generate("Say Hello");

  console.log(result);
})();