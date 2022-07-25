const {head, branch} = require('../lib/git.js');

module.exports = {
  configuration(options) {
    return {commit: head(options), branch: branch(options)};
  },
};
