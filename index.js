const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const loading = require("loading-cli");

async function main() {
  clear();
  console.log(
    chalk.red(figlet.textSync("logan-cli", { horizontalLayout: "full" }))
  );

  try {
    let load = loading("Starting setup");
    const program = await initProgram();
    load.stop();
  } catch (error) {
    console.log("Not able to proceed with the command \n", error);
  }
}

async function initProgram() {
  const program = require("commander");

  program
    .version("0.0.1")
    .description("A simple CLI to generate a Logan app")
    .command("create [name]", "Create a new logan app")
    .option("-p, --peppers", "Add peppers")
    .option("-P, --pineapple", "Add pineapple")
    .option("-b, --bbq", "Add bbq sauce")
    .option("-c, --cheese <type>", "Add the specified type of cheese [marble]")
    .option("-C, --no-cheese", "You do not want any cheese")
    .parse(process.argv);

  return program;
}

main();
