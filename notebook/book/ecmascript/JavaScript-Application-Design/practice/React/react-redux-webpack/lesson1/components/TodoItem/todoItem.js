import React, { Component } from 'react';

class TodoItem extends Component {
    constructor(props) {
        super(props);
    }

    handleComplete(e) {
        this.props.actions.completeTodo(this.props.todo.id);
    }

    handleDelete(e) {
        this.props.actions.deleteTodo(this.props.todo.id);
    }

    render () {
        return (
            <li>
                <p>{this.props.todo.text}</p>
                <button onClick={this.handleComplete.bind(this)}>Complete</button>
                <button onClick={this.handleDelete.bind(this)}>Delete</button>
            </li>
        );
    }
}

export default TodoItem;
