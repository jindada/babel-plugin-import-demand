'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var Plugin = _ref.Plugin,
      t = _ref.types;

  return new Plugin('import-demand', {
    visitor: {
      ImportDeclaration: function ImportDeclaration(node, _ref2) {
        var _this = this;

        var opt = _ref2.opt;

        var _ref3 = opt || {},
            name = _ref3.name,
            _ref3$path = _ref3.path,
            path = _ref3$path === undefined ? 'lib' : _ref3$path,
            _ref3$css = _ref3.css,
            css = _ref3$css === undefined ? false : _ref3$css;

        (0, _assert2.default)(name, 'name should be provided');
        if (node.source.value === name) {
          // 判断节点
          node.specifiers.forEach(function (_ref4) {
            var type = _ref4.type,
                imported = _ref4.imported,
                local = _ref4.local;

            if (type === 'ImportSpecifier') {
              _this.insertAfter(t.importDeclaration([t.importDefaultSpecifier(t.identifier(imported.name))], t.literal(name + '/' + path + '/' + imported.name.toLowerCase())));
              if (css) {
                _this.insertAfter(t.importDeclaration([], t.literal(name + '/' + path + '/' + imported.name.toLowerCase() + '.css')));
              }
            }
          });
          // 删除本身的节点
          this.dangerouslyRemove();
        }
      }
    }
  });
};

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }