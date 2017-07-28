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

