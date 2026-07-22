const previewService = require("../services/previewService");

const preview = async (req, res) => {
  console.log("✅ Preview Controller");

  try {
    const { projectPath } = req.body;

const result = await previewService.startPreview(projectPath);

   console.log("Preview Service Returned:", result);

    res.json(result);
  } catch (error) {
    console.error("❌ Preview Error:");
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  preview,
};