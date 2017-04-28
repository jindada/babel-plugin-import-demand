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
        var _ref2$opts = _ref2.opts,
            opts = _ref2$opts === undefined ? {} : _ref2$opts;
        var libName = opts.libName,
            _opts$libPath = opts.libPath,
            libPath = _opts$libPath === undefined ? 'lib' : _opts$libPath,
            _opts$css = opts.css,
            css = _opts$css === undefined ? true : _opts$css;

        (0, _assert2.default)(libName, 'libName should be provided in babel-plugin-import-demand');
        if (path.node.source.value === libName) {
          path.node.specifiers.forEach(function (_ref3) {
            var type = _ref3.type,
                imported = _ref3.imported,
                local = _ref3.local;

            if (type === 'ImportSpecifier') {
              path.insertBefore(t.importDeclaration([t.importDefaultSpecifier(t.identifier(imported.name))], t.stringLiteral(libName + '/' + libPath + '/' + imported.name.toLowerCase())));
              if (css) {
                path.insertBefore(t.importDeclaration([], t.stringLiteral(libName + '/' + libPath + '/' + imported.name.toLowerCase() + '.css')));
              }
            }
          });
          path.remove();
        }
      }
    }
  };
};