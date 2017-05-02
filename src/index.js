import assert from 'assert';

const ImportAstPlugin = (t, path, opt) => {
  const { libName, libPath = 'lib', cssPath } = opt;
  assert(libName, 'libName should be provided in babel-plugin-import-demand');

  if (path.node && path.node.source.value === libName) {
    path.node.specifiers.forEach(({type, imported, local}) => {
      if (type === 'ImportSpecifier') {
        path.insertBefore(
          t.importDeclaration(
            [ t.importDefaultSpecifier(
                t.identifier(imported.name)
            )],
            t.stringLiteral(`${libName}/${libPath}/${imported.name.toLowerCase()}`)
          )
        );
        if (cssPath) {
          path.insertBefore(
            t.importDeclaration(
              [],
              t.stringLiteral(`${libName}/${cssPath}`)
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
