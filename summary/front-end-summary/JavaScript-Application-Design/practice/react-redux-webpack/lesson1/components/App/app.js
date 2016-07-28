import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import TodoList from '../TodoList/todoList';
import TodoInput from '../TodoInput/todoInput';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import UserInfo from '../UserInfo/userInfo';


class App extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    };

    render () {
        return (
            <div>
                <h1> Todo List: </h1>
                <UserInfo
                    user={this.props.user}
                    actions={this.props.actions}
                />
                <TodoInput
                    addTodo={this.props.actions.addTodo}
                />
                <TodoList
                    todos={this.props.todos}
                    actions={this.props.actions}
                />
            </div>
        )
    };
}

function mapStateToProps(state) {
    return {
        todos: state.todos,
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
