const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const path = require("path");
const program = require("commander");
const { series } = require("async");
const { exec } = require("child_process");

// Install Logan
series([
 () => exec('npm install --save @pachecoio/logan'),
]); 

clear();
console.log(
  chalk.red(figlet.textSync("logan-cli", { horizontalLayout: "full" }))
);

program
  .version("0.0.1")
  .description("A simple CLI to generate a Logan app")
  .option("-p, --peppers", "Add peppers")
  .option("-P, --pineapple", "Add pineapple")
  .option("-b, --bbq", "Add bbq sauce")
  .option("-c, --cheese <type>", "Add the specified type of cheese [marble]")
  .option("-C, --no-cheese", "You do not want any cheese")
  .parse(process.argv);
