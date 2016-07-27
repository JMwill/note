import React, { Component } from 'react';
import TodoInput from '../TodoInput/todoInput';
import TodoList from '../TodoList/todoList';
import { connect } from 'react-redux';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {title: props.title, oldTitle: 'Temp'};
        this.replaceTitle.bind(this);
    };

    replaceTitle(e) {
        var oldTitle = e.target.innerText;
        this.setState({title: this.state.oldTitle});
        this.setState({oldTitle: oldTitle});
    };

    render () {
        return (
            <div>
                <h1> Todo List </h1>
                <TodoInput
                    dispatch={this.props.dispatch}
                />
                <TodoList
                    todos={this.props.todos}
                />
            </div>
        )
    };
}

function mapStateToProps(state) {
    return {
        todos: state.todos
    };
}

export default connect(mapStateToProps)(App);
