class Validator {
  validate(result) {
    if (!result) {
      return {
        status: "error",
        message: "Empty response."
      };
    }

    if (result.status === "error") {
      return result;
    }

    return result;
  }
}

module.exports = new Validator();