import assert from 'assert';

export default ({types: t}) => {
  return {
    visitor: {
      ImportDeclaration(path, {opts = {}}) {
        const { libName, libPath = 'lib', css = true } = opts;
        assert(libName, 'libName should be provided in babel-plugin-import-demand');
        if (path.node.source.value === libName) {
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
              if (css) {
                path.insertBefore(
                  t.importDeclaration(
                    [],
                    t.stringLiteral(`${libName}/${libPath}/${imported.name.toLowerCase()}.css`)
                  )
                );
              }
            }
          });
          path.remove();
        }
      }
    }
  };
};
