# Contributing to [svelte-put][github]

Thank you for stopping by. [svelte-put][github] welcomes and appreciates your contribution.

## Reporting Issues

Before opening a new issue, [first search for existing issues][github.issues] to avoid duplications.

When you start working on an issue, make sure you are asked to be assigned to it.

### Bug Report

Please include as much details as possible:

- steps to reproduce,
- a github repo that has enough setup to reproduce the bug would be nice. It might be helpful to clone this repo and play around in the [svelte-kit](./apps/svelte-kit/) project, create a branch to reproduce your problem there and reference in your issue.
- screenshots.

### Feature Request

If you have an idea and don't know where to start yet, consider [opening a discussion][github.discussions] first.

If you have a PR ready as your proposed implementation, you can [create an issue][github.issues] and a PR that references it.

## Pull Requests

Each pull request should [reference an open issue][github.issues.open] unless the change is very something simple such as a typo.

## Consistent Code Style

1. Commit message should follow the [Conventional Commits specification][conventionalcommits], this will enable [semantic-release][semanticrelease] to automate the workflow properly.
2. Code should be formatted with [prettier] and linted with [eslint]. They are already integrated into the codebase. See [package.json] for relevant scripts. There might also exist extensions for your editor that further enhance the experience with these tools.
   - [VS Code Prettier][vscode.extension.prettier]
   - [VS Code Eslint][vscode.extension.eslint]

## Development Setup

This is a monorepo managed with [pnpm] & [turborepo]. Familiarity with [turborepo] is helpful but [turborepo] shouldn't stand in your way otherwise.

The monorepo contains several "projects" (a folder with its own `package.json` - "package" in [pnpm] terminology). Using the term "subproject" here to include both "packages" (released to `npm`) and other npm projects.

Typically you will only work in one project at a time, in which case the workflow is similar if not exactly the following:

```bash
# cd to the project of interest

pnpm install
pnpm dev

pnpm lint
pnpm format

pnpm build

# to generate api analysis & docs
pnpm api
```

[turborepo]: https://turborepo.org/
[github]: https://github.com/vnphanquang/svelte-put
[github.issues]: https://github.com/vnphanquang/svelte-put/issues?q=
[github.issues.open]: https://github.com/vnphanquang/svelte-put/issues?q=is%3Aissue+is%3Aopen
[github.discussions]: https://github.com/vnphanquang/svelte-put/discussions
[conventionalcommits]: https://www.conventionalcommits.org/en/v1.0.0/
[semanticrelease]: https://github.com/semantic-release/semantic-release
[prettier]: https://prettier.io/
[eslint]: https://eslint.org/
[vscode.extension.prettier]: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
[vscode.extension.eslint]: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
[pnpm]: https://pnpm.io/
