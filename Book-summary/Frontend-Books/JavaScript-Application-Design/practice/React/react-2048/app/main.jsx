import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

ReactDOM.render(
    <div className="board-wrapper"><App /></div>,
    document.body.appendChild(document.createElement('div'))
);
