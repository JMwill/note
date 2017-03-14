import React, { Component } from 'react';

class UserInfo extends Component {
  constructor(props) {
    super(props);
  }

  handleChangeID (e) {
    this.props.actions.createUserID();
  }

  handleChangeOddID (e) {
    this.props.actions.createNewUserIDIfOdd();
  }

  handleChangeAsyncID (e) {
    this.props.actions.createNewUserIDAsync();
  }

  render () {
    return (
      <div className="user-info">
        <span>User: {this.props.user.username} </span>
        <span>ID: {this.props.user.id} </span>
        <button onClick={this.handleChangeID.bind(this)}>Change ID</button>
        <button onClick={this.handleChangeOddID.bind(this)}>Change ID If Odd</button>
        <button onClick={this.handleChangeAsyncID.bind(this)}>Change ID Async</button>
      </div>
    );
  }
}

export default UserInfo;
