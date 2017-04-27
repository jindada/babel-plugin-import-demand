'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var t = _ref.types;

  return {
    visitor: {
      ImportDeclaration: function ImportDeclaration(path, _ref2) {
        var _ref2$opt = _ref2.opt,
            opt = _ref2$opt === undefined ? {} : _ref2$opt;
        var name = opt.name,
            _opt$dir = opt.dir,
            dir = _opt$dir === undefined ? 'lib' : _opt$dir,
            _opt$css = opt.css,
            css = _opt$css === undefined ? true : _opt$css;

        (0, _assert2.default)(name, 'name should be provided');
        if (path.node.source.value === name) {
          path.node.specifiers.forEach(function (_ref3) {
            var type = _ref3.type,
                imported = _ref3.imported,
                local = _ref3.local;

            if (type === 'ImportSpecifier') {
              path.insertBefore(t.importDeclaration([t.importDefaultSpecifier(t.identifier(imported.name))], t.stringLiteral(name + '/' + dir + '/' + imported.name.toLowerCase())));
              if (css) {
                path.insertBefore(t.importDeclaration([], t.stringLiteral(name + '/' + dir + '/' + imported.name.toLowerCase() + '.css')));
              }
            }
          });
          path.remove();
        }
      }
    }
  };
};