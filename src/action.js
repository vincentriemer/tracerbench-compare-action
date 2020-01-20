const core = require('@actions/core');
const github = require('@actions/github');
const analyze = require('./analyze');

const configProperties = [
  'use-yarn',
  'repo-token',
  'control-sha',
  'experiment-sha',
  'experiment-ref',
  'build-control',
  'build-experiment',
  'control-build-command',
  'experiment-build-command',
  'control-serve-command',
  'experiment-serve-command',
  'control-dist',
  'experiment-dist',
  'control-url',
  'experiment-url',
  'markers'
  'fidelity'
];
const config = {};

configProperties.forEach(prop => {
  let input = core.getInput(prop);
  if (input === '') {
    input = undefined;
  } else if (input === 'true') {
    input = true;
  } else if (input === 'false') {
    input = false;
  }
  config[prop] = input;
});

async function main() {
  let failed = false;
  try {
    await analyze(config);
  } catch (e) {
    core.setFailed(e.message);
    failed = true;
  }
  process.exit(failed ? 1 : 0);
}

main();