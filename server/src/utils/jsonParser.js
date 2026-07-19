function cleanResponse(response) {
  return response
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .replace(/^Sure!?\s*/i, "")
    .trim();
}

function parseJSON(response) {
  try {
    return JSON.parse(cleanResponse(response));
  } catch (error) {
    return {
      status: "error",
      message: "Invalid JSON returned by LLM.",
      raw: response,
    };
  }
}

module.exports = {
  cleanResponse,
  parseJSON,
};