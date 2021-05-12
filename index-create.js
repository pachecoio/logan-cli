const fs = require("fs");
const program = require("commander");
const { createFolder } = require("./utils");
const { series } = require("async");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const ora = require("ora");

const Listr = require("listr");

let spinner;

async function createApp() {
  program.parse(process.argv);
  const appName = program.args[0];
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
      task: () => initializeGit(),
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
  const templatePath = `${__dirname}/files`;
  const currentPath = process.cwd();
  const files = fs.readdirSync(templatePath);
  files.forEach((file) => {
    const origFilePath = `${templatePath}/${file}`;
    const writePath = `${currentPath}/${appName}/${file}`;
    contents = fs
      .readFileSync(origFilePath, "utf8")
      .replace("<APPNAME>", appName);
    fs.writeFileSync(writePath, contents, "utf8");
  });
}

async function installPackages(appName) {
  await exec(`npm install --prefix ${appName} @pachecoio/logan`);
  await exec(`npm install --prefix ${appName} --save-dev`);
}

async function initializeGit() {}

async function appInstructions(appName) {
  console.log(`\n\nLogan app created successfully`);
  console.log("Next steps\n");
  console.log(`    cd ${appName}`);
  console.log(`    npm run dev:start\n\n`);
}

createApp();
