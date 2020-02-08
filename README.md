# to-json-schema

Options

```js
{
  title: '',
  id: 'http://example.com/schema.json',
  required: false,
  additionalProperties: false,
  examples: true,
  defaults: true,
  paths: true
}
```

Example Input/Output

```json
{
  "*username": "john.doe@exmaple.com",
  "name": {
    "first": "John",
    "last": "Doe"
  },
  "geoLocation": {
    "*lat": 37.1059113,
    "*lon": -97.0466279
  },
  "createdAt": {
    "type": "string",
    "format": "date-time"
  },
  "codes": [
    "pa",
    "ny",
    "oh"
  ]
}
```

```json
{
  "properties": {
    "username": {
      "type": "string",
      "examples": [
        "john.doe@exmaple.com"
      ],
      "default": ""
    },
    "name": {
      "properties": {
        "first": {
          "type": "string",
          "examples": [
            "John"
          ],
          "default": ""
        },
        "last": {
          "type": "string",
          "examples": [
            "Doe"
          ],
          "default": ""
        }
      },
      "required": [],
      "type": "object",
      "additionalProperties": false,
      "$id": "#/properties/name",
      "default": {}
    },
    "geoLocation": {
      "properties": {
        "lat": {
          "type": "number",
          "examples": [
            37.1059113
          ],
          "default": 0
        },
        "lon": {
          "type": "number",
          "examples": [
            -97.0466279
          ],
          "default": 0
        }
      },
      "required": [
        "lat",
        "lon"
      ],
      "type": "object",
      "additionalProperties": false,
      "$id": "#/properties/geoLocation",
      "default": {}
    },
    "createdAt": {
      "format": "date-time",
      "type": "string",
      "examples": [
        null
      ],
      "default": ""
    },
    "codes": {
      "type": "array",
      "items": {
        "type": "string",
        "examples": [
          "pa"
        ]
      },
      "default": []
    }
  },
  "required": [
    "username"
  ],
  "type": "object",
  "additionalProperties": false,
  "$id": "http://example.com/schema.json",
  "default": {},
  "$schema": "http://json-schema.org/draft-07/schema"
}
```
