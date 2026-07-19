const fs = require("fs");
const path = require("path");

class FileWriterService {
  constructor() {
    this.outputDir = path.join(process.cwd(), "generated-project");
  }

  createProject(projectName) {
    const projectPath = path.join(this.outputDir, projectName);

    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir);
    }

    if (!fs.existsSync(projectPath)) {
      fs.mkdirSync(projectPath, { recursive: true });
    }

    return projectPath;
  }

  createDirectory(projectPath, directory) {
    const dirPath = path.join(projectPath, directory);

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }

  writeFile(projectPath, filePath, content) {
    const fullPath = path.join(projectPath, filePath);

    const dir = path.dirname(fullPath);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(fullPath, content, "utf8");

    return fullPath;
  }
}

module.exports = new FileWriterService();