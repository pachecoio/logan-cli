const fs = require("fs");
const path = require("path");
const { createFolder } = require("./utils");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const Listr = require("listr");

async function createApp(appName, args) {
  const tasks = new Listr([
    {
      title: "Create app folder",
      task: () => createFolder(appName),
    },
    {
      title: "Copy project files",
      task: () => copyFiles(appName),
    },
    {
      title: "Initialize git",
      task: () => initializeGit(appName),
    },
    {
      title: "Install dependencies",
      task: () => installPackages(appName),
    },
  ]);
  await tasks.run();

  await appInstructions(appName);
}

async function copyFiles(appName) {
  const templatePath = path.join(__dirname, "files");
  const currentPath = process.cwd();
  const files = fs.readdirSync(templatePath);
  files.forEach((file) => {
    const origFilePath = path.join(templatePath, file);
    const writePath = path
      .join(currentPath, appName, file)
      .replace(".example", "");
    contents = fs
      .readFileSync(origFilePath, "utf8")
      .replace("<APPNAME>", appName);
    fs.writeFileSync(writePath, contents, "utf8");
  });
}

async function installPackages(appName) {
  const projectPath = path.join(process.cwd(), appName);
  await exec(`cd ${projectPath} && npm install --save logan-api`);
  await exec(`cd ${projectPath} && npm install`);
}

async function initializeGit(appName) {
  const projectPath = path.join(process.cwd(), appName);
  await exec(`cd ${projectPath} && git init & cd ..`);
}

async function appInstructions(appName) {
  console.log(`\n\nLogan app created successfully`);
  console.log("Next steps\n");
  console.log(`    cd ${appName}`);
  console.log(`    npm run dev:start\n\n`);
}

module.exports = {
  createApp,
};
