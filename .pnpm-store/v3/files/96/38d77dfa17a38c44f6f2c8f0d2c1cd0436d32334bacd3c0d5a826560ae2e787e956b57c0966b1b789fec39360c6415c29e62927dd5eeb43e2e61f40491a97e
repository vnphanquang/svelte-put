const appendStep = require('./appendStep');

function mockPlugin(name, returnValue) {
  jest.doMock(name, () => returnValue, { virtual: true });
}

describe('#appendStep', () => {
  const defaultReturn = jest.fn();
  let appendedStepFn;
  let verifyConditions;

  beforeEach(() => {
    appendedStepFn = jest.fn();
    verifyConditions = appendStep('verifyConditions', appendedStepFn, {
      defaultReturn,
    });
  });

  afterEach(() => jest.resetModules());

  it('returns a length 10 array of step functions', () => {
    expect(verifyConditions).toHaveLength(10);
    expect(verifyConditions[0]).toBeInstanceOf(Function);
    expect(verifyConditions[9]).toBeInstanceOf(Function);
  });

  describe('when there are no plugin steps defined', () => {
    const pluginConfig = {};
    const context = {
      options: {
        plugins: [],
      },
    };

    describe('and the step function at index 0 is run', () => {
      beforeEach(() => verifyConditions[0](pluginConfig, context));

      it('runs appendedStepFn', () => {
        expect(appendedStepFn).toHaveBeenCalledTimes(1);
      });

      it('passes an empty array in context.stepResults', () => {
        expect(appendedStepFn).toHaveBeenCalledWith(pluginConfig, {
          ...context,
          stepResults: [],
        });
      });
    });

    describe('and any of the step functions above index 0 are run', () => {
      let results;

      beforeEach(() => {
        results = verifyConditions
          .slice(1)
          .map(fn => fn(pluginConfig, context));
      });

      it("doesn't run appendedStepFn", () => {
        expect(appendedStepFn).toHaveBeenCalledTimes(0);
      });

      it('returns the defaultReturn value', () => {
        return Promise.all(results).then(values =>
          values.forEach(value => expect(value).toEqual(defaultReturn))
        );
      });
    });
  });

  describe('when there are n plugin steps defined', () => {
    mockPlugin('@semantic-release/github', {
      verifyConditions: jest.fn().mockReturnValue('github'),
    });

    mockPlugin('@semantic-release/npm', {
      verifyConditions: jest.fn().mockReturnValue('npm'),
    });

    mockPlugin('@semantic-release/commit-analyzer', {
      analyzeCommits: jest.fn().mockReturnValue('analyzeCommits'),
    });

    const pluginConfig = {};
    const context = {
      options: {
        plugins: [
          '@semantic-release/github',
          '@semantic-release/npm',
          [
            '@semantic-release/commit-analyzer',
            {
              preset: 'angular',
            },
          ],
        ],
      },
    };

    describe('and the step functions up to index n are run', () => {
      let results;

      beforeEach(() => {
        results = verifyConditions
          .slice(0, context.options.plugins.length)
          .map(fn => fn(pluginConfig, context));
      });

      it("doesn't run appendedStepFn", () => {
        expect(appendedStepFn).toHaveBeenCalledTimes(0);
      });

      it('returns the result of the plugin step functions', () => {
        return Promise.all(results).then(values =>
          expect(values).toEqual(['github', 'npm', defaultReturn])
        );
      });
    });

    describe('and the step functions up to and including index n are run', () => {
      let results;

      beforeEach(() => {
        results = verifyConditions
          .slice(0, context.options.plugins.length + 1)
          .map(fn => fn(pluginConfig, context));
      });

      it('runs appendedStepFn', () => {
        expect(appendedStepFn).toHaveBeenCalledTimes(1);
      });

      it('passes an array of the plugin step function results in context.stepResults', () => {
        expect(appendedStepFn).toHaveBeenCalledWith(pluginConfig, {
          ...context,
          stepResults: ['github', 'npm'],
        });
      });
    });
  });
});
