const fs = require("fs");
const program = require("commander");
const { createFolder } = require("./utils");
const { series } = require("async");
const { exec } = require("child_process");
const loading = require("loading-cli");

async function createApp() {
  program.parse(process.argv);

  const appName = program.args[0];

  createFolder(appName);

  await copyFiles(appName);

  await installPackages(appName);
}

async function copyFiles(appName) {
  const load = loading("Copying files").start();
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
  load.stop();
}

async function installPackages(appName) {
  exec(`npm install --prefix ${appName} @pachecoio/logan`);
  exec(`npm install --prefix ${appName} --save-dev`);
}

createApp();
