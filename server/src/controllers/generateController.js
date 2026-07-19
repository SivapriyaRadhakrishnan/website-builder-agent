const generateService = require("../services/generateService");

const health = (req, res) => {
  res.json({
    success: true,
    message: "Website Builder API is healthy",
  });
};

const generate = async (req, res) => {
  try {
    const { prompt } = req.body;

    const result = await generateService.generateWebsite(prompt);

    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  health,
  generate,
};