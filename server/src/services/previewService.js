const { exec, spawn } = require("child_process");
const path = require("path");
const CurrentProject = require("../config/currentProject");

class PreviewService {
  async startPreview() {
    console.log("Starting Preview...");
 const projectPath = CurrentProject.get();
 
console.log(projectPath);
    return new Promise((resolve, reject) => {
      console.log("Installing dependencies...");
      // Step 1: Install dependencies
      exec("npm install", { cwd: projectPath }, (error) => {
        if (error) {
          return reject(error);
        }
console.log("Dependencies installed.");
console.log("Starting Vite...");
        // Step 2: Start Vite in the background
        const viteProcess = spawn("npm", ["run", "dev"], {
          cwd: projectPath,
          shell: true,
          detached: true,
          stdio: "ignore",
        });

        viteProcess.unref();
console.log("Returning Preview URL...");
        // Step 3: Return immediately
        resolve({
          success: true,
          previewUrl: "http://localhost:5173",
          message: "Preview started successfully.",
        });
      });
    });
  }
}

module.exports = new PreviewService();