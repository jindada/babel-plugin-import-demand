import assert from 'assert';

export default ({types: t}) => {
  return {
    visitor: {
      ImportDeclaration(path, {opt = {}}) {
        const { name, dir = 'lib', css = true } = opt;
        assert(name, 'name should be provided');
        if (path.node.source.value === name) {
          path.node.specifiers.forEach(({type, imported, local}) => {
            if (type === 'ImportSpecifier') {
              path.insertBefore(
                t.importDeclaration(
                  [ t.importDefaultSpecifier(
                      t.identifier(imported.name)
                  )],
                  t.stringLiteral(`${name}/${dir}/${imported.name.toLowerCase()}`)
                )
              );
              if (css) {
                path.insertBefore(
                  t.importDeclaration(
                    [],
                    t.stringLiteral(`${name}/${dir}/${imported.name.toLowerCase()}.css`)
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
