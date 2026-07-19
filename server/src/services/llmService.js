const { Ollama } = require("ollama");
const config = require("../config/ollamaConfig");

const formatter = require("../utils/responseFormatter");
const { parseJSON } = require("../utils/jsonParser");

const ollama = new Ollama({
  host: config.host,
});

class LLMService {

  async generate(prompt) {

    let attempts = 2;

    while (attempts--) {

      try {

        const response = await ollama.chat({

          model: config.model,

          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],

          options: {
            temperature: config.temperature,
          },

        });

        return formatter.format(response.message.content);

      } catch (error) {

        if (attempts === 0) {

          return JSON.stringify({
            status: "error",
            message: error.message,
          });

        }

      }

    }

  }

  parseJSON(response) {
    return parseJSON(response);
  }

}

module.exports = new LLMService();