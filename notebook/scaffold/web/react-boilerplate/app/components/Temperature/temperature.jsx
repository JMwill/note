import React, { Component } from 'react';

class Temperature extends Component {
    constructor(props) {
        super(props);
        this.state = {
            temperature: 10,
            location: 'China'
        };
    }

    setLocation(location) {
        return ` in ${location}`;
    }

    render() {
        return (
            <div className="purple-skin temperature-show">
                <p className="__temperature">{this.state.temperature}&deg;</p>
                <p className="__location">
                    <span>Now</span>
                    {this.setLocation(this.state.location)}
                </p>
            </div>
        );
    }
}

export default Temperature;
