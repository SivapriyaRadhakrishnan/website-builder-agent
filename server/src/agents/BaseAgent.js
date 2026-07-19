class BaseAgent {
  constructor(name) {
    if (!name) {
      throw new Error("Agent name is required");
    }

    this.name = name;
  }

  async execute(input) {
    throw new Error(`${this.name} must implement execute(input)`);
  }
}

module.exports = BaseAgent;
