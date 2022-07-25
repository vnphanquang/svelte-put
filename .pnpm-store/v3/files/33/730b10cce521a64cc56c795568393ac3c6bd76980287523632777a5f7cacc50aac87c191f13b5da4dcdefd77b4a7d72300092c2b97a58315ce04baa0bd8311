const path = require('path');
const rc = require('rc');
const getRegistryUrl = require('registry-auth-token/registry-url');

module.exports = ({publishConfig: {registry} = {}, name}, {cwd, env}) =>
  registry ||
  env.NPM_CONFIG_REGISTRY ||
  getRegistryUrl(
    name.split('/')[0],
    rc(
      'npm',
      {registry: 'https://registry.npmjs.org/'},
      {config: env.NPM_CONFIG_USERCONFIG || path.resolve(cwd, '.npmrc')}
    )
  );
