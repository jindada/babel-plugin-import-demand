## babel-plugin-import-demand

[![NPM version](https://img.shields.io/npm/v/babel-plugin-import-demand.svg?style=flat)](https://npmjs.org/package/babel-plugin-import-demand)
[![NPM downloads](http://img.shields.io/npm/dm/babel-plugin-import-demand.svg?style=flat)](https://npmjs.org/package/babel-plugin-import-demand)

## Example

Converts

```javascript
import { Button, DatePicker } from 'projectName';
```

(roughly) to

```javascript
var _button = require('projectName/lib/button');

var _button2 = _interopRequireDefault(_button);

var _datePicker = require('projectName/lib/date_picker');

var __datePicker2 = _interopRequireDefault(_datePicker);
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
  "libPath": "lib",        // default: lib
  "spell": true,           // default: false
  "cssPath": "style/css",  // default: undefined
}
```

`options` can be an array.

For Example: 

```javascript
[
  {
    "libName": "project",
    "libPath": "dist",       // default: lib
  },
  {
    "libName": "antd",
    "libPath": "lib",
    "spell": true,
    "cssPath": "style"
  }
]
```


### Note

babel-plugin-import-demand will be not working if you add the library in webpack config **vender**
