import React from 'react';
import Board from './Board/board.jsx';

require('./App.css');

export default () => <Board boardWidth="4" />;

/*
export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <h1>Hello World</h1>
    );
  }
}
*/
