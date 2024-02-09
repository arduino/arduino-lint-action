## Development workflow

### 1. Install tools

#### Node.js

[**npm**](https://www.npmjs.com/) is used for dependency management.

Follow the installation instructions here:<br />
https://nodejs.dev/download

Node.js 20.x is used for development of this project. [nvm](https://github.com/nvm-sh/nvm) is recommended to easily switch between Node.js versions.

### 2. Install dependencies

To work on the codebase you have to install all the dependencies:

```
npm install
```

### 3. Coding

Now you're ready to work some [TypeScript](https://www.typescriptlang.org/) magic!

Make sure to write or update tests for your work when appropriate.

### 4. Format code

Format the code to follow the standard style for the project:

```
npm run format
```

### 5. Run tests

To run tests set the environment variable `GITHUB_TOKEN` with a valid Personal Access Token and then:

```
npm run test
```

See the [official Github documentation][pat-docs] to learn more about Personal Access Tokens.

### 6. Build

It is necessary to compile the code before it can be used by GitHub Actions. Remember to run these commands before committing any code changes:

```
npm run build
npm run pack
```

### 7. Commit

Everything is now ready to make your contribution to the project, so commit it to the repository and submit a pull request.

Thanks!

## Release workflow

Instructions for releasing a new version of the action:

1. If the release will increment the major version, update the action refs in the examples in `README.md` (e.g., `uses: arduino/arduino-lint-action@v1` -> `uses: arduino/arduino-lint-action@v2`).
1. Create a [GitHub release](https://docs.github.com/en/github/administering-a-repository/managing-releases-in-a-repository#creating-a-release), following the `vX.Y.Z` tag name convention. Make sure to follow [the SemVer specification](https://semver.org/).
1. Rebase the release branch for that major version (e.g., `v1` branch for the `v1.x.x` tags) on the tag. If no branch exists for the release's major version, create one.

[pat-docs]: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token
