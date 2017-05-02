## babel-plugin-import-demand

[![NPM version](https://img.shields.io/npm/v/babel-plugin-import-demand.svg?style=flat)](https://npmjs.org/package/babel-plugin-import-demand)
[![NPM downloads](http://img.shields.io/npm/dm/babel-plugin-import-demand.svg?style=flat)](https://npmjs.org/package/babel-plugin-import-demand)


## Why babel-plugin-import-demand

 Load project on demand

## Example

Converts

```javascript
import { Button, Table } from 'projectName';
```

(roughly) to

```javascript
var _button = require('projectName/lib/button');

var _button2 = _interopRequireDefault(_button);

var _table = require('projectName/lib/table');

var _table2 = _interopRequireDefault(_table);
```

## Usage

```bash
npm install babel-plugin-import-demand --save-dev
```

Via `.babelrc` or babel-loader.

```js
{
  "plugins": [["import-demand", options]]
}
```

### options

`options` can be object.

For Example: 

```javascript
{
  "libName": "antd",
  "libPath": "dist",  // default: lib
  "css": true,        // default: false
}
```

`options` can be an array.

For Example: 

```javascript
[
  {
    "libName": "project",
    "libPath": "dist",   // default: lib
    "css": true          // default: false
  },
  {
    "libName": "antd",
    "libPath": "lib"
  }
]
```


### Note

babel-plugin-import-demand will be not working if you add the library in webpack config **vender**
