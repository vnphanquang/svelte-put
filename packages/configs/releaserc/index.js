/* eslint-disable @typescript-eslint/no-var-requires */
const { commitAnalyzer, releaseNotesGenerator, changelog, npm, github, git } = require('./plugins');

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
  plugins: [commitAnalyzer, releaseNotesGenerator, changelog, npm, github, git].map((plugin) =>
    Object.values(plugin),
  ),
};

module.exports = options;
