#!/usr/bin/env node

const { argv } = require('yargs');
const { createArdereJson } = require('./utils');

const plan = createArdereJson(argv.count, argv.pauseBetweenSteps, argv.options);
// eslint-disable-next-line no-console
console.log(JSON.stringify(plan, null, 2));
