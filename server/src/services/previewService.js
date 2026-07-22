const fs = require("fs");
const { exec, spawn } = require("child_process");
const path = require("path");
const CurrentProject = require("../config/currentProject");

class PreviewService {
 async startPreview(projectPath) {
    console.log("Starting Preview...");

    
    console.log("Project Path:", projectPath);

    return new Promise((resolve, reject) => {
      const nodeModulesPath = path.join(projectPath, "node_modules");

      const startVite = () => {
        console.log("Starting Vite...");

        const viteProcess = spawn("npm", ["run", "dev"], {
  cwd: projectPath,
  shell: true,
  windowsHide: true,
  stdio: ["ignore", "pipe", "pipe"],
  env: {
    ...process.env,
    FORCE_COLOR: "0",
  },
});

        let outputBuffer = "";

        let resolved = false;

        viteProcess.stdout.on("data", (data) => {
          const output = data.toString();

         console.log("RAW:");
console.log(JSON.stringify(output));


          outputBuffer += output;
console.log("Buffer:", outputBuffer);
         if (!resolved && outputBuffer.includes("Local:")) {

    console.log("✅ Local found");

    const match = outputBuffer.match(/http:\/\/localhost:\d+\//);

    console.log("Match:", match);

    if (match) {
        console.log("Matched URL:", match[0]);

        resolved = true;

        resolve({
            success: true,
            previewUrl: match[0],
            message: "Preview started successfully.",
        });

        return; // optional but recommended
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