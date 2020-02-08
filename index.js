const isPlainObject = function (a) {
  return typeof a === 'object' && Object.getPrototypeOf(a) === Object.prototype
}

const hasOwnProperty = function (key, obj) {
  return Object.prototype.hasOwnProperty.call(obj, key)
}

const pipe = function (...args) {
  return (x) => args.reduce((v, f) => f(v), x)
}

const omit = function (arr, obj) {
  return Object.keys(obj).filter(a => !arr.includes(a)).reduce((p, c) => ({ ...p, [`${c}`]: obj[c] }), {})
}

const pick = function (arr, obj) {
  return Object.keys(obj).filter(a => arr.includes(a)).reduce((p, c) => ({ ...p, [`${c}`]: obj[c] }), {})
}

const pass = function (a) {
  return a
}

const isValidType = (function () {
  const xs = [
    'number',
    'integer',
    'string',
    'array',
    'object',
    'boolean',
    'null'
  ]
  return (a) => (
    Array.isArray(a) ? a.every(b => xs.includes(b)) : xs.includes(a)
  )
}())

const inferType = function (a) {
  return (a = isPlainObject(a) ? (a.type || a) : a) && !a ? 'string' : isValidType(a) ? a : (Array.isArray(a) ? 'array' : typeof a)
}

const inferFormat = (function () {
  const xs = [
    ['email', /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/],
    // [, 'idn-email'],
    // [, "regex"],
    ['ipv4', /^((?:2[0-5]{2}|1\d{2}|[1-9]\d|[1-9])\.(?:(?:2[0-5]{2}|1\d{2}|[1-9]\d|\d)\.){2}(?:2[0-5]{2}|1\d{2}|[1-9]\d|\d)):(\d|[1-9]\d|[1-9]\d{2,3}|[1-5]\d{4}|6[0-4]\d{3}|654\d{2}|655[0-2]\d|6553[0-5])$/],
    ['ipv6', /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/],
    ['uri', /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/],
    // [, 'uri-reference'],
    // [, 'iri'],
    // [, 'iri-reference'],
    ['date', /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/], // 2018-11-13
    ['time', /^((19|20)[0-9][0-9])[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])[T]([01][1-9]|[2][0-3])[:]([0-5][0-9])[:]([0-5][0-9])([+|-]([01][0-9]|[2][0-3])[:]([0-5][0-9])){0,1}$/g], // 20:20:39+00:00
    ['date-time', /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/], // 2018-11-13T20:20:39+00:00
    ['hostname', /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/],
    // [, "idn-hostname"],
    ['json-pointer']
    // [, "relative-json-pointer"]
  ]
  return (a) => (
    typeof a === 'string' ? xs.map(([regexp, format]) => false) : a
  )
}())

const getkeywords = (function () {
  const dict = {
    number: [
      'maximum',
      'exclusiveMaximum',
      'minimum',
      'exclusiveMinimum',
      'multipleOf',
      'format'
    ],
    string: [
      'maxLength',
      'minLength',
      'pattern',
      'format',
      'contentMediaType',
      'contentEncoding'
    ],
    array: [
      'maxItems',
      'minItems',
      'items',
      'contains',
      'uniqueItems'
    ],
    object: [
      'maxProperties',
      'minProperties',
      'required',
      'dependencies',
      'propertyNames',
      'additionalProperties',
      'patternProperties'
    ]
  }
  const xs = [
    '$ref',
    '$comment',
    'const',
    'enum',
    'not',
    'anyOf',
    'oneOf',
    'allOf',
    'if',
    'readOnly',
    'writeOnly'
  ]
  return (type) => (
    [...(hasOwnProperty(type, dict) ? dict[type] : []), ...xs]
  )
}())

const getExample = function (a) {
  const x = isPlainObject(a) ? (a.examples || a.contains || a.enum) : a
  return (
    Array.isArray(x) ? x : [x]
  )
}

const newObjectSchema = function (json, next = pass) {
  const type = 'object'
  const keywords = getkeywords(type)
  const obj = json.type === type ? { ...(json.properties || {}), ...omit(['type', 'properties', ...keywords], json) } : { ...json }
  const schema = {
    ...Object.keys(obj)
      .reduce((prev, key) => {
        const value = newSchema(obj[key], next)

        if (key.charAt(0) === '*') {
          prev.required = [...prev.required, (key = key.substr(1))]
        }

        prev.properties = { ...prev.properties, [`${key}`]: value }

        return prev
      }, {
        properties: {},
        required: []
      }),
    ...pick(keywords, json),
    type
  }
  return next(schema)
}

const isHomogeneous = function (arr) {
  const [head, tail] = [arr[0], arr.slice(1)]
  const type = inferType(head)

  return tail.every(a => inferType(a) === type)
}

const isValidItemType = function (type) {
  return type === 'number' || type === 'string' || type === 'object'
}

const newArraySchema = function (json, next = pass) {
  const type = 'array'
  const keywords = getkeywords(type)
  const xs = isPlainObject(json) && json.type === 'array' ? json.items : json
  const schema = { type }

  let items

  if (Array.isArray(xs) && xs.length >= 1) {
    if (isHomogeneous(xs)) {
      items = newSchema(xs[0])
    } else {
      items = xs.map((a) => newSchema(a, next))
    }
  } else {
    if (isValidItemType(inferType(xs))) {
      items = newSchema(xs, next)
    }
  }

  if (isPlainObject(items)) {
    items.examples = xs
  }

  return next({ ...schema, ...pick(keywords, json), items })
}

const newGenericSchema = function (json, next = pass) {
  const type = inferType(json)
  const schema = {
    ...pick(getkeywords(type), json),
    type,
    examples: getExample(json)
  }

  if (schema.type === 'string') {
    schema.format = inferFormat(json)
  }

  return next(schema)
}

const newSchema = function newSchema (json, next = pass) {
  let type

  if (isPlainObject(json)) {
    if (isValidType(json.type)) {
      type = json.type
    }
  }

  if (!type) {
    type = inferType(json)
  }

  let fn

  if (type === 'object') {
    fn = newObjectSchema
  } else if (type === 'array') {
    fn = newArraySchema
  } else {
    fn = newGenericSchema
  }
  return fn(json, next)
}

const useExamples = function (v) {
  return v !== true ? (a) => omit(['examples'], a) : pass
}

const usePath = function (v) {
  const fn = (field, a) => {
    const $id = field || '#'

    let schema

    if (isPlainObject(a) && a.type === 'object') {
      schema = {
        ...a,
        $id,
        properties: Object.keys(a.properties)
          .reduce((p, key) => (
            { ...p, [`${key}`]: fn(`${$id}/properties/${key}`, a.properties[key]) }
          ), {})
      }
    } else {
      schema = a
    }
    return schema
  }
  return v ? (a) => fn('', a) : pass
}

const useAdditionalProperties = function (v = true) {
  return (a) => a.type === 'object' ? ({ ...a, additionalProperties: (a.additionalProperties || v) }) : a
}

const useRequired = function (v) {
  return v ? (a) => (a.type === 'object') ? { ...a, required: [...new Set([...Object.keys(a.properties), ...a.required])] } : a : pass
}

const useDetectFormat = function (v) {
  return v ? pass : pass
}

const useDefault = function (v) {
  return v ? (a) => ({ ...a, default: (a.type = (a.type === 'integer') ? 'number' : a.type) && globalThis[`${a.type.charAt(0).toUpperCase()}${a.type.slice(1)}`]() }) : pass
}

const parse = function (json, opt = {}) {
  const schema = newSchema(json, pipe(...[
    useAdditionalProperties(opt.additionalProperties),
    usePath(opt.paths),
    useRequired(opt.required),
    useDefault(opt.defaults),
    useExamples(opt.examples),
    useDetectFormat(opt.detectFormat)
  ]))

  if (opt.id) {
    schema.$id = opt.id
  }

  if (opt.title) {
    schema.title = opt.title
  }

  schema.$schema = 'http://json-schema.org/draft-07/schema'

  return schema
}

module.exports = parse
