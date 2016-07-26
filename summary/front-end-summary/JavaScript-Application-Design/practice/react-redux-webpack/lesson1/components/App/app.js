import React, { Component } from 'react'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {title: props.title, oldTitle: 'Temp'};
        // this.replaceTitle.bind(this);
    };

    replaceTitle(e) {
        var oldTitle = e.target.innerText;
        this.setState({title: this.state.oldTitle});
        this.setState({oldTitle: oldTitle});
    };

    render () {
        return (
            <div onClick={this.replaceTitle.bind(this)}>{this.state.title}</div>
        )
    };
}

export default App;
