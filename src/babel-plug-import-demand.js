import assert from 'assert';

export default function ({Plugin, types: t}) {
  return new Plugin('import-demand', {
    visitor: {
      ImportDeclaration: function(node, { opt }) {
        const { name, path = 'lib', css = false } = opt || {};
        assert(name, 'name should be provided');
        if (node.source.value === name) { // 判断节点
          node.specifiers.forEach(({type, imported, local}) => {
            if (type === 'ImportSpecifier') {
              this.insertAfter(
                t.importDeclaration(
                  [
                    t.importDefaultSpecifier(
                    t.identifier(imported.name)
                  )],
                  t.literal(`${name}/${path}/${imported.name.toLowerCase()}`)
                )
              );
              if (css) {
                this.insertAfter(
                  t.importDeclaration(
                    [],
                    t.literal(`${name}/${path}/${imported.name.toLowerCase()}.css`)
                  )
                );
              }
            }
          });
          // 删除本身的节点
          this.dangerouslyRemove();
        }
      }
    }
  });
}
