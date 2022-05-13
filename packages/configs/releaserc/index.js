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

/** @type {import('semantic-release').Options} */
const options = {
  ci: true,
  branches: [
    '+([0-9])?(.{+([0-9]),x}).x',
    'main',
    'next',
    'next-major',
    { name: 'beta', prerelease: true },
    { name: 'alpha', prerelease: true },
  ],
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'conventionalcommits',
        presetConfig: conventionalcommits,
        releaseRules: [
          { type: 'docs', scope: 'README', release: 'patch' },
          { type: 'dev', release: 'patch' },
        ],
      },
    ],
    [
      '@semantic-release/release-notes-generator',
      {
        preset: 'conventionalcommits',
        presetConfig: conventionalcommits,
      },
    ],
    [
      '@semantic-release/changelog',
      {
        changelogTitle: '# Changelog',
        changelogFile: 'CHANGELOG.md',
      },
    ],
    '@semantic-release/npm',
    '@semantic-release/github',
    [
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md', 'package.json'],
        message: `chore(release): <%= nextRelease.version %> - <%= new Date().toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' }) %> [skip ci]`,
      },
    ],
  ],
};

module.exports = options;
