import * as core from "@actions/core";
import * as exec from "@actions/exec";
import * as installer from "./installer";

async function run() {
  try {
    const path = core.getInput("path");
    const version = core.getInput("version");
    const compliance = core.getInput("compliance");
    const libraryManager = core.getInput("library-manager");
    const projectType = core.getInput("project-type");
    const recursive = core.getInput("recursive");
    const reportFile = core.getInput("report-file");
    const verbose = core.getInput("verbose");
    const official = core.getInput("official");

    let toolPath = "arduino-lint";
    if (version) {
      toolPath = await installer.getArduinoLint(version);
    }

    await exec.exec(toolPath, ["--version"]); // Display the version of arduino-lint in use.

    const execArgs = [
      "--compliance",
      compliance,
      "--project-type",
      projectType,
    ];

    // Add arguments that don't have default input values only if they are defined.
    if (libraryManager) {
      execArgs.push("--library-manager", libraryManager);
    }

    if (reportFile) {
      execArgs.push("--report-file", reportFile);
    }

    // Add Boolean flags only if true.
    if (recursive == "true") {
      execArgs.push("--recursive");
    }

    if (verbose == "true") {
      execArgs.push("--verbose");
    }

    if (path) {
      execArgs.push(path);
    }

    const options = {
      env: {
        ARDUINO_LINT_OFFICIAL: official, // The official mode is set via an environment variable.
      },
    };

    await exec.exec(toolPath, execArgs, options);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
