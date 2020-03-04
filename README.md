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
  paths: true,
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
  "tenant": "123e4567-e89b-12d3-a456-426655440000",
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
{
  "type": "object",
  "properties": {
    "name": {
      "type": "object",
      "properties": {
        "first": {
          "type": "string",
          "default": "",
          "examples": [
            "Jason"
          ]
        },
        "last": {
          "type": "string",
          "default": "",
          "examples": [
            "Bourne"
          ]
        }
      },
      "required": [],
      "additionalProperties": false,
      "default": {},
      "$id": "#/properties/name",
      "examples": [
        {
          "first": "Jason",
          "last": "Bourne"
        }
      ]
    },
    "tenant": {
      "type": "string",
      "default": "",
      "format": "uuid",
      "examples": [
        "123e4567-e89b-12d3-a456-426655440000"
      ]
    },
    "age": {
      "type": "number",
      "default": 0,
      "examples": [
        30
      ]
    },
    "username": {
      "type": "string",
      "default": "",
      "examples": [
        "jbourne"
      ]
    },
    "email": {
      "type": "string",
      "default": "",
      "format": "email",
      "examples": [
        "jason.bourne@gmail.com"
      ]
    },
    "createdAt": {
      "type": "string",
      "default": "",
      "format": "date-time",
      "examples": [
        "2018-11-13T20:20:39+00:00"
      ]
    },
    "lastLogin": {
      "type": "object",
      "properties": {
        "time": {
          "type": "string",
          "default": "",
          "format": "time",
          "examples": [
            "20:20:39+00:00"
          ]
        },
        "date": {
          "type": "string",
          "default": "",
          "format": "date",
          "examples": [
            "2018-11-13"
          ]
        },
        "terminal": {
          "type": "object",
          "properties": {
            "ip": {
              "type": "string",
              "default": "",
              "format": "ipv4",
              "examples": [
                "98.139.180.149"
              ]
            }
          },
          "required": [],
          "additionalProperties": false,
          "default": {},
          "$id": "#/properties/lastLogin/properties/terminal",
          "examples": [
            {
              "ip": "98.139.180.149"
            }
          ]
        }
      },
      "required": [],
      "additionalProperties": false,
      "default": {},
      "$id": "#/properties/lastLogin",
      "examples": [
        {
          "time": "20:20:39+00:00",
          "date": "2018-11-13",
          "terminal": {
            "ip": "98.139.180.149"
          }
        }
      ]
    },
    "whitelist": {
      "type": "array",
      "items": {
        "type": "string",
        "default": "",
        "format": "ipv6",
        "examples": [
          "2607:f0d0:1002:0051:0000:0000:0000:0004"
        ]
      },
      "default": [],
      "examples": [
        "2607:f0d0:1002:0051:0000:0000:0000:0004",
        "2607:f0d0:1002:51::4"
      ]
    }
  },
  "required": [
    "username",
    "email"
  ],
  "additionalProperties": false,
  "$id": "http://example.com/schema.json"
}
```
