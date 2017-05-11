
## markdown-for-react

[![NPM version](https://img.shields.io/npm/v/markdown-for-react.svg?style=flat)](https://npmjs.org/package/markdown-for-react)
[![NPM downloads](http://img.shields.io/npm/dm/markdown-for-react.svg?style=flat)](https://npmjs.org/package/markdown-for-react)

[live demo](https://jindada.github.io/markdown-for-react)

> lightweight react component based on [markdown-it](https://github.com/markdown-it/markdown-it), [react-html-parser](https://github.com/wrakky/react-html-parser), [highlight.js](https://github.com/isagalaev/highlight.js)

## Usage examples
``` js
import React from 'react';
import { render } from 'react-dom';
import MarkdownForReact from 'markdown-for-react';

const text = `
# h1 text
## h2 text
### h3 text
#### h4 text
##### h5 text
###### \`h6 text\`
\`\`\`js
cnsole.log(hello markdown-for-react)
\`\`\`
`

class Example extends React.Component {
  render() {
    return (
      <div>
        <MarkdownForReact value={"# qweqwe"} />
        <MarkdownForReact value={ text } />
      </div>
    )
  }
}
render(<Example />, document.getElementById('init'));
```


## For Example

# h1 text
## h2 text
### h3 text
#### h4 text
##### h5 text
###### h6 text

"double quotes" and 'single quotes'

**bold text**

__bold text__

*italic text*

_italic text_

~~Strikethrough~~

> china
>> heilongjiang
>>> harbin

+ China
  - heilongjiang
    * harin
    + daqing
    - suihua
+ England

1. react
2. vue
3. angular
1. jquery
1. css

57. heilongjiang
1. beijing

    // hello world
    line 1
    line 2
    line 3

## Tables

| lib    |     url     |
| ------ | ----------- |
| react  | https://github.com/facebook/react |
| vuejs  | https://github.com/vuejs/vue |
| angular| https://github.com/angular/angular |


| lib     |     url      |
| ------: | -----------: |
| react  | https://github.com/facebook/react |
| vuejs  | https://github.com/vuejs/vue |
| angular| https://github.com/angular/angular |


[link text](https://github.com/jindada/markdown-for-react)

[link with title](https://github.com/jindada/markdown-for-react "markdown-for-react")

![Minion](https://octodex.github.com/images/minion.png)

![Alt text][id]

[id]: https://octodex.github.com/images/dojocat.jpg  "The Dojocat"


## Contributing

You can submit any ideas as [pull requests](https://github.com/jindada/markdown-for-react) or as a [GitLab issue](https://github.com/jindada/markdown-for-react/issues).