const writer = require("./src/services/FileWriterService");

const project = writer.createProject("demo-app");

writer.writeFile(
  project,
  "src/App.jsx",
  `function App(){
    return <h1>Hello</h1>;
}

export default App;`
);

console.log("Done");