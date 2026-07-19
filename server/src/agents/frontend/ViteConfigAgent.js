const BaseAgent = require("../BaseAgent");

class ViteConfigAgent extends BaseAgent {
  constructor() {
    super("ViteConfigAgent");
  }

  async execute() {
    return `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
});
`;
  }
}

module.exports = new ViteConfigAgent();