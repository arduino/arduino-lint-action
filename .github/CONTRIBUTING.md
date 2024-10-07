## Development workflow

### 1. Install tools

#### Node.js

[**npm**](https://www.npmjs.com/) is used for dependency management.

Follow the installation instructions here:<br />
https://nodejs.dev/download

The **Node.js** version in use is defined in the `engines.node` field of [`package.json`](../package.json).

[nvm](https://github.com/nvm-sh/nvm) is recommended to easily switch between Node.js versions.

#### Python

**Python**-based tools are used for some project development operations.

The **Python** version in use is defined in the `tool.poetry.dependencies` field of [`pyproject.toml`](../pyproject.toml).

#### Task

The [**Task**](https://taskfile.dev) task runner tool is used for all common development and validation operations.

Follow the installation instructions here:<br />
https://taskfile.dev/installation/

### 2. Install dependencies

To work on the codebase you have to install all the dependencies:

```
task npm:install-deps
```

### 3. Coding

Now you're ready to work some [TypeScript](https://www.typescriptlang.org/) magic!

Make sure to write or update tests for your work when appropriate.

### 4. Format code

Format the code to follow the standard style for the project:

```
task general:format-prettier
```

### 5. Run tests

To run tests set the environment variable `GITHUB_TOKEN` with a valid Personal Access Token and then:

```
task js:test
```

See the [official Github documentation][pat-docs] to learn more about Personal Access Tokens.

### 6. Build

It is necessary to compile the code before it can be used by GitHub Actions. Remember to run this commands before committing any code changes:

```
task build
```

### 7. Commit

Everything is now ready to make your contribution to the project, so commit it to the repository and submit a pull request.

Thanks!

## Common Development Operations

### Running Checks

Checks and tests are set up to ensure the project content is functional and compliant with the established standards.

You can run the full suite of checks by running the following command from a terminal in a path under the repository:

```text
task check
```

### Automatic Corrections

Tools are provided to automatically bring the project into compliance with some of the required checks.

You can make these automatic fixes by running the following command from a terminal in a path under the repository:

```text
task fix
```

### Other Operations

Individual tasks are provided for each specific common validation and automated correction operation. The convenience `check` and `fix` tasks run all of the relevant individual tasks, so it is not necessary for the contributor to use the individual tasks. However, in some cases it may be more efficient to run the single specific task of interest.

You can learn the names of all the available tasks by running the following command from a terminal in a path under the repository:

```text
task --list
```

## Release workflow

Instructions for releasing a new version of the action:

1. If the release will increment the major version, update the action refs in the examples in `README.md` (e.g., `uses: arduino/arduino-lint-action@v1` -> `uses: arduino/arduino-lint-action@v2`).
1. Create a [GitHub release](https://docs.github.com/en/github/administering-a-repository/managing-releases-in-a-repository#creating-a-release), following the `vX.Y.Z` tag name convention. Make sure to follow [the SemVer specification](https://semver.org/).
1. Rebase the release branch for that major version (e.g., `v1` branch for the `v1.x.x` tags) on the tag. If no branch exists for the release's major version, create one.

[pat-docs]: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token
