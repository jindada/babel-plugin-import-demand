'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var camel2Underline = function camel2Underline(_str) {
  var str = _str[0].toLowerCase() + _str.substr(1);
  return str.replace(/([A-Z])/g, function ($1) {
    return '_' + $1.toLowerCase();
  });
};

var ImportAstPlugin = function ImportAstPlugin(t, path, opt) {
  var libName = opt.libName,
      _opt$libPath = opt.libPath,
      libPath = _opt$libPath === undefined ? 'lib' : _opt$libPath,
      _opt$cssPath = opt.cssPath,
      cssPath = _opt$cssPath === undefined ? undefined : _opt$cssPath,
      _opt$spell = opt.spell,
      spell = _opt$spell === undefined ? false : _opt$spell;

  (0, _assert2.default)(libName, 'libName should be provided in babel-plugin-import-demand');

  if (path.node && path.node.source.value === libName) {
    path.node.specifiers.forEach(function (_ref) {
      var type = _ref.type,
          imported = _ref.imported,
          local = _ref.local;

      if (type === 'ImportSpecifier') {
        path.insertBefore(t.importDeclaration([t.importDefaultSpecifier(t.identifier(imported.name))], t.stringLiteral(libName + '/' + libPath + '/' + (spell ? camel2Underline(imported.name) : imported.name.toLowerCase()))));
        if (cssPath) {
          path.insertBefore(t.importDeclaration([], t.stringLiteral(libName + '/' + libPath + '/' + (spell ? camel2Underline(imported.name) : imported.name.toLowerCase()) + '/' + cssPath)));
        }
      }
    });
    path.remove();
  }
};

exports.default = function (_ref2) {
  var t = _ref2.types;

  return {
    visitor: {
      ImportDeclaration: function ImportDeclaration(path, _ref3) {
        var _ref3$opts = _ref3.opts,
            opts = _ref3$opts === undefined ? {} : _ref3$opts;

        if (Array.isArray(opts)) {
          opts.map(function (opt) {
            ImportAstPlugin(t, path, opt);
          });
        } else {
          ImportAstPlugin(t, path, opts);
        }
      }
    }
  };
};