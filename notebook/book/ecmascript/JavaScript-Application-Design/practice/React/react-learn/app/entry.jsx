const React = require('react');
const ReactDOM = require('react-dom');

require('./style/app.css')

ReactDOM.render(
    <div>
        <h1 className="{style.h1}">Hello World</h1>
        <h2 className="h2">Hello Webpack</h2>
    </div>,
    document.querySelector('#wrapper')
);
