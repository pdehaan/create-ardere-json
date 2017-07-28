const fs = require('fs');
const ini = require('ini');

const ARDERE_TEMPLATE = {
  ecs_name: '{ecs_name}',
  name: 'Loadtest',
  description: '{description}',
  metrics_options: {
    enabled: true,
    dashboard: {
      admin_user: 'admin',
      admin_password: 'testing',
      name: '{dashboard.name}',
      filename: 'gf_basic_dashboard.json'
    }
  }
};

module.exports = {
  createArdereJson,
  createSteps,
  parseEnv
};

function parseEnv(data) {
  // If the `data` argument isn't a string, blindly assume it's a JSON object.
  if (typeof data !== 'string') {
    data = ini.stringify(data);
  }
  if (fs.existsSync(data)) {
    data = fs.readFileSync(data, 'utf-8');
  }
  return ini.parse(data);
}

function createArdereJson(...arguments) {
  const plan = Object.assign({}, ARDERE_TEMPLATE);
  plan.steps = createSteps(...arguments);
  return plan;
}

function createSteps(count = 1, pauseBetweenSteps = 60, options = {}) {
  const stepNumber = idx => `step-${String(idx + 1).padStart(2, '0')}`;
  const stepDelay = (idx, runMaxTime, pauseBetweenSteps) =>
    idx * runMaxTime + idx * pauseBetweenSteps;
  const DEFAULT_OPTIONS = {
    env: {},
    cmd: '{cmd}',
    instance_count: 1,
    instance_type: 'm3.medium',
    run_max_time: 300,
    container_name: 'firefoxtesteng/{container_name}:latest',
    docker_series: '{docker_series}'
  };
  options = Object.assign({}, DEFAULT_OPTIONS, options);
  options.env = parseEnv(options.env);
  return new Array(count).fill({}).map((opts, idx) => {
    const stepOptions = Object.assign({}, opts, options);
    stepOptions.run_delay = stepDelay(
      idx,
      stepOptions.run_max_time,
      pauseBetweenSteps
    );
    stepOptions.name = stepNumber(idx);
    if (stepOptions.run_delay === 0) {
      delete stepOptions.run_delay;
    }
    return stepOptions;
  });
}
