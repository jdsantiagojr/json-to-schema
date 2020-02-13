# json-to-schema

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
  detectFormat: true
}
```

Example Input/Output

```json
{
  "name": {
    "first": "Jason",
    "last": "Bourne"
  },
  "age": 30,
  "*username": "jbourne",
  "*email": "jason.bourne@gmail.com",
  "createdAt": "2018-11-13T20:20:39+00:00",
  "lastLogin": {
    "time": "20:20:39+00:00",
    "date": "2018-11-13",
    "terminal": {
      "ip": "98.139.180.149"
    }
  },
  "whitelist": [
    "2607:f0d0:1002:0051:0000:0000:0000:0004",
    "2607:f0d0:1002:51::4"
  ]
}
```

```json
{
  "properties": {
    "name": {
      "properties": {
        "first": {
          "type": "string",
          "examples": [
            "Jason"
          ],
          "default": ""
        },
        "last": {
          "type": "string",
          "examples": [
            "Bourne"
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
    "age": {
      "type": "number",
      "examples": [
        30
      ],
      "default": 0
    },
    "username": {
      "type": "string",
      "examples": [
        "jbourne"
      ],
      "default": ""
    },
    "email": {
      "type": "string",
      "examples": [
        "jason.bourne@gmail.com"
      ],
      "format": "email",
      "default": ""
    },
    "createdAt": {
      "type": "string",
      "examples": [
        "2018-11-13T20:20:39+00:00"
      ],
      "format": "date-time",
      "default": ""
    },
    "lastLogin": {
      "properties": {
        "time": {
          "type": "string",
          "examples": [
            "20:20:39+00:00"
          ],
          "format": "time",
          "default": ""
        },
        "date": {
          "type": "string",
          "examples": [
            "2018-11-13"
          ],
          "format": "date",
          "default": ""
        },
        "terminal": {
          "properties": {
            "ip": {
              "type": "string",
              "examples": [
                "98.139.180.149"
              ],
              "format": "ipv4",
              "default": ""
            }
          },
          "required": [],
          "type": "object",
          "additionalProperties": false,
          "$id": "#/properties/lastLogin/properties/terminal",
          "default": {}
        }
      },
      "required": [],
      "type": "object",
      "additionalProperties": false,
      "$id": "#/properties/lastLogin",
      "default": {}
    },
    "whitelist": {
      "type": "array",
      "items": {
        "type": "string",
        "examples": [
          "2607:f0d0:1002:0051:0000:0000:0000:0004",
          "2607:f0d0:1002:51::4"
        ],
        "format": "ipv6"
      },
      "default": []
    }
  },
  "required": [
    "username",
    "email"
  ],
  "type": "object",
  "additionalProperties": false,
  "$id": "http://example.com/schema.json",
  "default": {},
  "$schema": "http://json-schema.org/draft-07/schema"
}
```
