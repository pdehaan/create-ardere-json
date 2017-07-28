# create-ardere-json

CLI tool to create an ardere.json file.

## Requirements:

- Node.js 8+

## Installation:

### Installing globally:
```sh
$ npm i pdehaan/create-ardere-json -g
```

### Installing locally:
```sh
$ npm i pdehaan/create-ardere-json -D
```

## Running:

### Running globally:

```sh
$ create-ardere-json --count 9 --pause-between-steps 40 --options.env './dev.env' --options.cmd 'tox -e docker'
```

### Running locally:

```sh
$ $(npm bin)/create-ardere-json --count 9 --pause-between-steps 100 --options.env './dev.env' --options.cmd 'tox -e linux'
```

### Running with `npx`:

If you're running npm@5.3, you can run `create-ardere-json` directly without installing it by running the following command:

```sh
$ npx pdehaan/create-ardere-json \
    --count=3 \
    --options.cmd='tox -e docker' \
    --options.instance_type='t2.micro' \
    --options.env.URL_SERVER='https://send.stage.mozaws.net/'
```

This will create the following output:

```json
{
  "ecs_name": "{ecs_name}",
  "name": "Loadtest",
  "description": "{description}",
  "metrics_options": {
    "enabled": true,
    "dashboard": {
      "admin_user": "admin",
      "admin_password": "testing",
      "name": "{dashboard.name}",
      "filename": "gf_basic_dashboard.json"
    }
  },
  "steps": [
    {
      "env": {
        "URL_SERVER": "https://send.stage.mozaws.net/"
      },
      "cmd": "tox -e docker",
      "instance_count": 1,
      "instance_type": "t2.micro",
      "run_max_time": 300,
      "container_name": "firefoxtesteng/{container_name}:latest",
      "docker_series": "{docker_series}",
      "name": "step-01"
    },
    {
      "env": {
        "URL_SERVER": "https://send.stage.mozaws.net/"
      },
      "cmd": "tox -e docker",
      "instance_count": 1,
      "instance_type": "t2.micro",
      "run_max_time": 300,
      "container_name": "firefoxtesteng/{container_name}:latest",
      "docker_series": "{docker_series}",
      "run_delay": 360,
      "name": "step-02"
    },
    {
      "env": {
        "URL_SERVER": "https://send.stage.mozaws.net/"
      },
      "cmd": "tox -e docker",
      "instance_count": 1,
      "instance_type": "t2.micro",
      "run_max_time": 300,
      "container_name": "firefoxtesteng/{container_name}:latest",
      "docker_series": "{docker_series}",
      "run_delay": 720,
      "name": "step-03"
    }
  ]
}
```

Instead of setting the environment variables individually, you can pass a path to a .env file, like so:

```ini
# send.env
URL_SERVER=https://send.stage.mozaws.net
MOLOTOV_PROCESSES=35
MOLOTOV_WORKERS=10
```

```sh
$ create-ardere-json \
  --count=3 \
  --pause-between-steps=100 \
  --options.cmd='tox -e docker' \
  --options.instance_type='t2.micro' \
  --options.env='send.env' 
```

Or you can set the environment variables directly:

```sh
$ create-ardere-json \
  --count=3 \
  --pause-between-steps=100 \
  --options.env='URL_SERVER=https://send.firefox.com'
```
