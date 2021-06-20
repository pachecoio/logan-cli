#!/usr/bin/env node
const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const { program } = require("commander");
const { createApp } = require("./actions");

clear();
console.log(
  chalk.red(figlet.textSync("logan-cli", { horizontalLayout: "full" }))
);

program
  .command("create <type>")
  .alias("new")
  .description("Create a new Logan-api app")
  .action(createApp);

program.parse(process.argv);
