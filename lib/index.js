'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ImportAstPlugin = function ImportAstPlugin(t, path, opt) {
  var libName = opt.libName,
      _opt$libPath = opt.libPath,
      libPath = _opt$libPath === undefined ? 'lib' : _opt$libPath,
      _opt$cssPath = opt.cssPath,
      cssPath = _opt$cssPath === undefined ? undefined : _opt$cssPath;

  (0, _assert2.default)(libName, 'libName should be provided in babel-plugin-import-demand');

  if (path.node && path.node.source.value === libName) {
    path.node.specifiers.forEach(function (_ref) {
      var type = _ref.type,
          imported = _ref.imported,
          local = _ref.local;

      if (type === 'ImportSpecifier') {
        path.insertBefore(t.importDeclaration([t.importDefaultSpecifier(t.identifier(imported.name))], t.stringLiteral(libName + '/' + libPath + '/' + imported.name.toLowerCase())));
        if (cssPath) {
          path.insertBefore(t.importDeclaration([], t.stringLiteral(libName + '/' + cssPath)));
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