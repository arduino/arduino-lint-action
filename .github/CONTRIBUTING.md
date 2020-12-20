## Development

To work on the codebase you have to install all the dependencies:

```sh
# npm install
```

To run tests set the environment variable `GITHUB_TOKEN` with a valid Personal Access Token and then:

```sh
# npm run test
```

See the [official Github documentation][pat-docs] to learn more about Personal Access Tokens.

## Release

1. `npm install` to add all the dependencies, included development.
1. `npm run build` to build the Action under the `./lib` folder.
1. `npm run test` to see everything works as expected.
1. `npm run pack` to package for distribution
1. `git add src dist` to check in the code that matters.
1. If the release will increment the major version, update the action refs in the examples in README.md
   (e.g., `uses: arduino/arduino-lint-action@v1` -> `uses: arduino/arduino-lint-action@v2`).
1. open a PR and request a review.
1. After PR is merged, create a release, following the `vX.X.X` tag name convention.
1. After the release, rebase the release branch for that major version (e.g., `v1` branch for the v1.x.x tags) on the
   tag. If no branch exists for the release's major version, create one.

[pat-docs]: https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token
