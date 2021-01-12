import core = require("@actions/core");
import io = require("@actions/io");
import path = require("path");
import os = require("os");
import fs = require("fs");
import nock = require("nock");

const toolDir = path.join(__dirname, "runner", "tools");
const tempDir = path.join(__dirname, "runner", "temp");
const dataDir = path.join(__dirname, "testdata");
const IS_WINDOWS = process.platform === "win32";

process.env["RUNNER_TEMP"] = tempDir;
process.env["RUNNER_TOOL_CACHE"] = toolDir;
import * as installer from "../src/installer";

// Inputs for mock @actions/core
let inputs = {
  token: process.env.GITHUB_TOKEN || "",
} as any;

describe("installer tests", () => {
  beforeEach(async function () {
    // Mock getInput
    jest.spyOn(core, "getInput").mockImplementation((name: string) => {
      return inputs[name];
    });

    await io.rmRF(toolDir);
    await io.rmRF(tempDir);
    await io.mkdirP(toolDir);
    await io.mkdirP(tempDir);
  });

  afterAll(async () => {
    try {
      await io.rmRF(toolDir);
      await io.rmRF(tempDir);
    } catch {
      console.log("Failed to remove test directories");
    }
    jest.restoreAllMocks();
  });

  it("Downloads version of arduino-lint if no matching version is installed", async () => {
    const toolPath = await installer.getArduinoLint("1.0.0");
    const bindir = path.join(toolDir, "arduino-lint", "1.0.0", os.arch());

    expect(toolPath == path.join(bindir, "arduino-lint")).toBe(true);
    expect(fs.existsSync(`${bindir}.complete`)).toBe(true);

    if (IS_WINDOWS) {
      expect(fs.existsSync(path.join(bindir, "arduino-lint.exe"))).toBe(true);
    } else {
      expect(fs.existsSync(path.join(bindir, "arduino-lint"))).toBe(true);
    }
  }, 20000);

  describe("Gets the latest release of arduino-lint", () => {
    beforeEach(() => {
      jest.spyOn(core, "getInput").mockImplementation((name: string) => {
        return inputs[name];
      });

      nock("https://api.github.com")
        .get("/repos/arduino/arduino-lint/git/refs/tags")
        .replyWithFile(200, path.join(dataDir, "tags.json"));
    });

    afterEach(() => {
      nock.cleanAll();
      nock.enableNetConnect();
      jest.clearAllMocks();
    });

    it("Gets the latest version of arduino-lint 1.0.0 using 1.0 and no matching version is installed", async () => {
      await installer.getArduinoLint("1.0");
      const bindir = path.join(toolDir, "arduino-lint", "1.0.0", os.arch());

      expect(fs.existsSync(`${bindir}.complete`)).toBe(true);
      if (IS_WINDOWS) {
        expect(fs.existsSync(path.join(bindir, "arduino-lint.exe"))).toBe(true);
      } else {
        expect(fs.existsSync(path.join(bindir, "arduino-lint"))).toBe(true);
      }
    }, 20000);

    it("Gets latest version of the 1 major series using 1.x and no matching version is installed", async () => {
      await installer.getArduinoLint("1.x");
      const bindir = path.join(toolDir, "arduino-lint", "1.0.0", os.arch());

      expect(fs.existsSync(`${bindir}.complete`)).toBe(true);
      if (IS_WINDOWS) {
        expect(fs.existsSync(path.join(bindir, "arduino-lint.exe"))).toBe(true);
      } else {
        expect(fs.existsSync(path.join(bindir, "arduino-lint"))).toBe(true);
      }
    }, 20000);
  });
});
