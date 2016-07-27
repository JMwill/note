import React, { Component } from 'react';

class TodoItem extends Component {
    constructor(props) {
        super(props);
    }

    handleComplete(e) {

    }

    handleDelete(e) {

    }

    render () {
        return (
            <li>
                <span>{this.props.todo.text}</span>
                <button onClick={this.handleComplete.bind(this)}>Complete</button>
                <button onClick={this.handleDelete.bind(this)}>Delete</button>
            </li>
        );
    }
}

export default TodoItem;
