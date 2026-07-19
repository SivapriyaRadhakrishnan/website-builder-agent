module.exports = {
  host: process.env.OLLAMA_HOST || "http://127.0.0.1:11434",
  model: process.env.OLLAMA_MODEL || "llama3.2:3b",
  temperature: Number(process.env.OLLAMA_TEMPERATURE) || 0.2,
};