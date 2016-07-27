import React, { Component } from 'react';
import actions, { addTodo } from '../../redux/actions';

class TodoInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'Initial Value'
        };
    }

    handleChange(e) {
        var input = e.target.value;
        this.setState({
            value: input
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.dispatch(actions.addTodo(this.state.value));
    }

    render () {
        return (
            <div className="text-input-container">
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <input
                        type="text"
                        placeholder="Type todo"
                        value={this.state.value}
                        onChange={this.handleChange.bind(this)}
                    />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

export default TodoInput;
