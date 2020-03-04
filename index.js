const isPlainObject = function (a) {
  return typeof a === 'object' && Object.getPrototypeOf(a) === Object.prototype
}

const hasOwnProperty = function (key, obj) {
  return Object.prototype.hasOwnProperty.call(obj, key)
}

const omit = function (arr, obj) {
  return Object.keys(obj).filter(a => !arr.includes(a)).reduce((p, c) => ({ ...p, [`${c}`]: obj[c] }), {})
}

const pick = function (arr, obj) {
  return Object.keys(obj).filter(a => arr.includes(a)).reduce((p, c) => ({ ...p, [`${c}`]: obj[c] }), {})
}

const isArray = function (a) {
  return Array.isArray(a)
}

const pipe = function (...args) {
  return (x) => args.reduce((v, f) => f(v), x)
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
  return (a) => xs.includes(a)
}())

const inferType = function (a) {
  return (a = isPlainObject(a) && a.type || a) && !a ? 'string' : !isArray(a) && isValidType(a) ? a : isArray(a) ? 'array' : typeof a
}

const inferFormat = (function () {
  const xs = [
    ['email', /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/],
    // ['regex', ],
    ['ipv4', /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/],
    ['ipv6', /(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/],
    ['uri', /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/],
    ['date-time', /^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i], // 2018-11-13T20:20:39+00:00
    ['time', /^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i], // 20:20:39+00:00
    ['date', /^\d\d\d\d-[0-1]\d-[0-3]\d$/], // 2018-11-13
    ['json-pointer', /^(?:\/(?:[^~/]|~0|~1)*)*$/],
    ['relative-json-pointer', /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/],
    ['uuid', /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i]
  ]
  return (a) => (
    typeof a === 'string' ? (xs.find(([_, regexp]) => regexp.test(a)) || [])[0] : a
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

const useDefault = function (v) {
  return v ? (a) => ({ ...a, default: (a.type = (a.type === 'integer') ? 'number' : a.type) && globalThis[`${a.type.charAt(0).toUpperCase()}${a.type.slice(1)}`]() }) : pass
}

const useDetectFormat = function (v) {
  return v ? (a) => a.type === 'string' ? { ...a,  format: inferFormat(a._v) } : a : pass
}

const useAdditionalProperties = function (v) {
  return (a) => a.type === 'object' ? ({ ...a, additionalProperties: (a.additionalProperties || v) }) : a
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

const useExample = function (v) {
  return v ? (a) => ({...a, examples: a.type === 'array' ? isArray(a._v) ? a._v : [a._v] : a.examples || a.contains || a.enum || [a._v]}) : pass
}

const useRequired = function (v) {
  return v ? (a) => (a.type === 'object') ? { ...a, required: [...new Set([...Object.keys(a.properties), ...a.required])] } : a : pass
}

const useOutput = function (a) {
  return omit(['_v'], a)
}

const newObjectSchema = function (json, next = pass) {
  const type = 'object'
  const keywords = getkeywords(type)
  const obj = json.type === type ? { ...(json.properties || {}), ...omit(['type', 'properties', ...keywords], json) } : json
  const schema = Object.keys(obj)
    .reduce((prev, key) => {
      const value = parse(obj[key], next)

      if (key.charAt(0) === '*') {
        prev.required = [...prev.required, (key = key.substr(1))]
      }

      prev.properties = { ...prev.properties, [`${key}`]: value }

      return prev
    }, {
      type,
      properties: {},
      required: [],
      _v: json,
      ...pick(keywords, json)
    })
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

  let items

  if (Array.isArray(xs) && xs.length >= 1) {
    if (isHomogeneous(xs)) {
      items = parse(xs[0], next)
    } else {
      items = xs.map((a) => parse(a, next))
    }
  } else {
    if (isValidItemType(inferType(xs))) {
      items = parse(xs, next)
    }
  }
  return next({ ...pick(keywords, json), type, items, _v: xs })
}

const newGenericSchema = function (json, next = pass) {
  const type = inferType(json)
  const schema = {
    ...pick(getkeywords(type), json),
    type,
    _v: json
  }
  return next(schema)
}

const parse = function parse(json, next = pass) {
  const type = inferType(json)

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

const main = function (json, opt) {
  const fn = pipe(
    useRequired(opt.required),
    useAdditionalProperties(opt.additionalProperties),
    useDefault(opt.defaults),
    usePath(opt.paths),
    useDetectFormat(opt.detectFormat),
    useExample(opt.examples),
    useOutput
  )
  const schema = omit(['examples', 'default'], parse(json, fn))

  if (opt.id) {
    schema.$id = opt.id
  }

  if (opt.title) {
    schema.title = opt.title
  }

  return schema
}

if (typeof module !== 'undefined' && !module.parent) {
  module.exports = main
}

if (typeof window !== 'undefined' && typeof window === 'object') {
  window.jsonToSchema = main;
}
