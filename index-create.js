const fs = require("fs");
const program = require("commander");
const { createFolder } = require("./utils");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const Listr = require("listr");
const npm = util.promisify(require("npm-run").exec);

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
  const templatePath = `${__dirname}/files`;
  const currentPath = process.cwd();
  const files = fs.readdirSync(templatePath);
  files.forEach((file) => {
    const origFilePath = `${templatePath}/${file}`;
    const writePath = `${currentPath}/${appName}/${file}`.replace(
      ".example",
      ""
    );
    contents = fs
      .readFileSync(origFilePath, "utf8")
      .replace("<APPNAME>", appName);
    fs.writeFileSync(writePath, contents, "utf8");
  });
}

async function installPackages(appName) {
  const projectPath = `${process.cwd()}/${appName}`;
  // await exec(`npm install --prefix ${projectPath} @pachecoio/logan`);
  // await exec(`npm install --prefix ${projectPath} --save-dev`);
  await npm(`npm install --prefix ${projectPath} @pachecoio/logan`, {
    cmd: projectPath,
  });
  await npm(`npm install --prefix ${projectPath} --save-dev`, {
    cmd: projectPath,
  });
}

async function initializeGit(appName) {
  const projectPath = `${process.cwd()}/${appName}`;
  await exec(`cd ${projectPath} && git init & cd ..`);
}

async function appInstructions(appName) {
  console.log(`\n\nLogan app created successfully`);
  console.log("Next steps\n");
  console.log(`    cd ${appName}`);
  console.log(`    npm run dev:start\n\n`);
}

createApp();
