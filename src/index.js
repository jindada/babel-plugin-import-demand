import assert from 'assert';

const camel2Dash = (_str) => {
  const str = _str[0].toLowerCase() + _str.substr(1);
  return str.replace(/([A-Z])/g, function camel2DashReplace($1) {
    return '-' + $1.toLowerCase();
  });
};

const ImportAstPlugin = (t, path, opt) => {
  const { libName, libPath = 'lib', cssPath = undefined, spell = false } = opt;
  assert(libName, 'libName should be provided in babel-plugin-import-demand');

  if (path.node && path.node.source.value === libName) {
    path.node.specifiers.forEach(({type, imported, local}) => {
      if (type === 'ImportSpecifier') {
        path.insertBefore(
          t.importDeclaration(
            [ t.importDefaultSpecifier(
                t.identifier(imported.name)
            )],
            t.stringLiteral(`${libName}/${libPath}/${spell ? camel2Dash(imported.name) : imported.name.toLowerCase()}`)
          )
        );
        if (cssPath) {
          path.insertBefore(
            t.importDeclaration(
              [],
              t.stringLiteral(`${libName}/${libPath}/${spell ? camel2Dash(imported.name) : imported.name.toLowerCase()}/${cssPath}`)
            )
          );
        }
      }
    });
    path.remove();
  }
};

export default ({types: t}) => {
  return {
    visitor: {
      ImportDeclaration(path, { opts = {} }) {
        if (Array.isArray(opts)) {
          opts.map((opt) => {
            ImportAstPlugin(t, path, opt);
          });
        } else {
          ImportAstPlugin(t, path, opts);   
        }      
      }
    }
  };
};
