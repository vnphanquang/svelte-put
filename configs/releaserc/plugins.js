const conventionalcommits = {
  issueUrlFormat: '{{host}}/{{owner}}/{{repository}}/issues/{{id}}',
  commitUrlFormat: '{{host}}/{{owner}}/{{repository}}/commit/{{hash}}',
  compareUrlFormat: '{{host}}/{{owner}}/{{repository}}/compare/{{previousTag}}...{{currentTag}}',
  userUrlFormat: '{{host}}/{{user}}',
  issuePrefixes: ['#'],
  types: [
    { type: 'feat', section: 'Features' },
    { type: 'feature', section: 'Features' },
    { type: 'fix', section: 'Bug Fixes' },
    { type: 'perf', section: 'Performance Improvements' },
    { type: 'revert', section: 'Reverts' },
    { type: 'docs', section: 'Documentation' },
    { type: 'refactor', section: 'Code Refactoring' },
    { type: 'test', section: 'Tests' },
    { type: 'build', section: 'Build System' },
    { type: 'ci', section: 'Continuous Integration' },
    { type: 'style', section: 'Styles', hidden: true },
    { type: 'dev', section: 'Development', hidden: false },
    { type: 'chore', section: 'Miscellaneous Chores', hidden: true },
  ],
};

/** https://github.com/semantic-release/commit-analyzer */
const commitAnalyzer = {
  package: '@semantic-release/commit-analyzer',
  config: {
    presetConfig: conventionalcommits,
    preset: 'conventionalcommits',
    releaseRules: [
      { type: 'docs', scope: 'README', release: 'patch' },
      { type: 'dev', release: 'patch' },
    ],
  },
};

/** https://github.com/semantic-release/release-notes-generator */
const releaseNotesGenerator = {
  package: '@semantic-release/release-notes-generator',
  config: {
    preset: 'conventionalcommits',
    presetConfig: conventionalcommits,
  },
};

/** https://github.com/semantic-release/changelog */
const changelog = {
  package: '@semantic-release/changelog',
  config: {
    changelogTitle: '# Changelog',
    changelogFile: 'CHANGELOG.md',
  },
};

/** https://github.com/semantic-release/npm */
const npm = {
  package: '@semantic-release/npm',
  config: {},
};

/** https://github.com/semantic-release/github */
const github = {
  package: '@semantic-release/github',
  config: {},
};

/** https://github.com/semantic-release/git */
const git = {
  package: '@semantic-release/git',
  config: {
    assets: ['CHANGELOG.md', 'package.json'],
    message: `chore(release): <%= nextRelease.version %> - <%= new Date().toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' }) %> [skip ci]`,
  },
};

module.exports = {
  commitAnalyzer,
  releaseNotesGenerator,
  changelog,
  npm,
  github,
  git,
};
