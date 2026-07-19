class ResponseFormatter {
  format(response) {
    if (!response) return "";

    return response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .replace(/`/g, '"')
      .replace(/\r/g, "")
      .trim();
  }
}

module.exports = new ResponseFormatter();