# Module skeleton
Simple skeleton to reuse for every module we are writing/using. So its simple and easy to start with a new module without doing the necessary integration over and over again.
___
You may also want to check [https://github.com/taxfix/manifest](https://github.com/taxfix/manifest) repo — the place where we collect knowledge around our projects and codebase. It has some useful documents and guidelines which might help you.

It is using [alkaa](https://github.com/taxfix/alkaa) as base to define a common set of configurations for aligned development experience.
## Prerequisites
- Node >= 18 and NPM installed

## Get Started
Use to create a npm module via [devfix](https://dev.taxfix.tech/)

> **NOTE** If you use this as github template repo or completely manuelly, make sure you rename `package.json.tmpl` to `package.json` and replace `{{ .appName }} with the desired module name.

## Get Started manuelly
1. Check out this repository
2. Create folder for the new repository
3. In the new folder run `git init`
4. Copy over the content of this repo and run `npm install`
5. Replace `name`, `description` and `repository` in `package.json`

## Whats its providing
- Basic development setup with `jest`, `typescript`, `eslint` and `standard-version`
- GitLab setup to run the test and publish automatically to npm if a git tag is created
- Using `npm` for dependency management

## Available Commands
| Command | Description
| ------- | -----------
| `npm build` | Build `src` folder
| `npm test` | Run tests, append `--watch` to run tests in watch mode
| `npm run lint` | Run tslint
| `npm run ci` | Run tests as on CI, including test coverage
| `npm run release` | Execute `standard-version` to generate/update `Changelog.md` and determine next tag by following conventional commits
