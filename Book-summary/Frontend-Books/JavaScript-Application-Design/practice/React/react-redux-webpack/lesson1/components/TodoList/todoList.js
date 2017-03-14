import React, { Component } from 'react';
import TodoItem from '../TodoItem/todoItem';

class TodoList extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <ul>
                {this.props.todos.map((todo) => {
                    return <TodoItem key={todo.id} todo={todo} actions={this.props.actions} />
                })}
            </ul>
        );
    };
}

export default TodoList;
