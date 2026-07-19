let currentProjectPath = "";

module.exports = {
  set(path) {
    currentProjectPath = path;
  },

  get() {
    return currentProjectPath;
  }
};