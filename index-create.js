const fs = require("fs");
const program = require("commander");
const { createFolder } = require("./utils");

program.parse(process.argv);

const appName = program.args[0];

createFolder(appName);

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
