const process = require('process');
const git = require('./services/git.js');

const services = {
  appveyor: require('./services/appveyor.js'),
  bamboo: require('./services/bamboo.js'),
  bitbucket: require('./services/bitbucket.js'),
  bitrise: require('./services/bitrise.js'),
  buddy: require('./services/buddy.js'),
  buildkite: require('./services/buildkite.js'),
  circleci: require('./services/circleci.js'),
  cirrus: require('./services/cirrus.js'),
  cloudflarePages: require('./services/cloudflare-pages.js'),
  codebuild: require('./services/codebuild.js'),
  codefresh: require('./services/codefresh.js'),
  codeship: require('./services/codeship.js'),
  drone: require('./services/drone.js'),
  github: require('./services/github.js'),
  gitlab: require('./services/gitlab.js'),
  jenkins: require('./services/jenkins.js'),
  netlify: require('./services/netlify.js'),
  puppet: require('./services/puppet.js'),
  sail: require('./services/sail.js'),
  scrutinizer: require('./services/scrutinizer.js'),
  semaphore: require('./services/semaphore.js'),
  shippable: require('./services/shippable.js'),
  teamcity: require('./services/teamcity.js'),
  travis: require('./services/travis.js'),
  vela: require('./services/vela.js'),
  vercel: require('./services/vercel.js'),
  vsts: require('./services/vsts.js'),
  wercker: require('./services/wercker.js'),
};

module.exports = ({env = process.env, cwd = process.cwd()} = {}) => {
  for (const name of Object.keys(services)) {
    if (services[name].detect({env, cwd})) {
      return {isCi: true, ...services[name].configuration({env, cwd})};
    }
  }

  return {isCi: Boolean(env.CI), ...git.configuration({env, cwd})};
};
