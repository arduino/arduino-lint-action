/*
  Copyright 2019 Arduino SA

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

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
    if (error instanceof Error) {
      core.setFailed(error.message);
    } else {
      throw error;
    }
  }
}

run();
