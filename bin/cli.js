#!/usr/bin/env node

const fs = require('fs').promises
const path = require('path')
const parse = require('json-to-schema')
const { argv } = require('yargs')
  .option('file', {
    alias: 'f',
    description: 'Path to JSON file',
    demandOption: true
  })
  .options({
    id: {
      type: 'string',
      default: 'http://example.com/schema.json'
    },
    title: {
      type: 'string',
      default: null
    },
    required: {
      type: 'boolean',
      default: false
    },
    additionalProperties: {
      type: 'boolean',
      default: false
    },
    detectFormat: {
      type: 'boolean',
      default: true
    },
    examples: {
      type: 'boolean',
      default: true
    },
    defaults: {
      type: 'boolean',
      default: true
    },
    paths: {
      type: 'boolean',
      default: true
    }
  })
  .wrap(null)
  .help()
  .alias('help', 'h')

fs.readFile(path.normalize(argv.file), { flag: 'r', encoding: 'utf8' })
  .then(json => parse(JSON.parse(json), argv))
  .then(schema => console.log(JSON.stringify(schema, null, 2)))
  .catch(err => console.log(err.message))
