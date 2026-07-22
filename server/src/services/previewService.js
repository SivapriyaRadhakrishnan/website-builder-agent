const fs = require("fs");
const { exec, spawn } = require("child_process");
const path = require("path");
const CurrentProject = require("../config/currentProject");

class PreviewService {
  async startPreview() {
    console.log("Starting Preview...");

    const projectPath = CurrentProject.get();
    console.log("Project Path:", projectPath);

    return new Promise((resolve, reject) => {
      const nodeModulesPath = path.join(projectPath, "node_modules");

      const startVite = () => {
        console.log("Starting Vite...");

        const viteProcess = spawn("npm", ["run", "dev"], {
          cwd: projectPath,
          shell: true,
          detached: false,
          windowsHide: true,
          stdio: ["ignore", "pipe", "pipe"],
        });

        let outputBuffer = "";

        let resolved = false;

        viteProcess.stdout.on("data", (data) => {
          const output = data.toString();

          console.log(output);

          outputBuffer += output;

          if (!resolved && outputBuffer.includes("Local:")) {
            const match = outputBuffer.match(/http:\/\/localhost:\d+\//);

            if (match) {
              resolved = true;

              console.log("Preview URL:", match[0]);

              resolve({
                success: true,
                previewUrl: match[0],
                message: "Preview started successfully.",
              });
            }
          }
        });
        viteProcess.stderr.on("data", (data) => {
          console.error(data.toString());
        });

        viteProcess.on("error", (err) => {
          reject(err);
        });
      };

      if (!fs.existsSync(nodeModulesPath)) {
        console.log("Installing dependencies...");

        exec("npm install", { cwd: projectPath }, (error) => {
          if (error) {
            return reject(error);
          }

          console.log("Dependencies installed.");
          startVite();
        });
      } else {
        console.log("Dependencies already installed.");
        startVite();
      }
    });
  }
}

module.exports = new PreviewService();