let actions = {
  addTodo: function (text) {
    return {
      type: 'ADD_TODO',
      text: text
    }
  },

  completeTodo: function (id) {
    return {
      type: 'COMPLETE_TODO',
      id: id
    }
  },

  deleteTodo: function (id) {
    return {
      type: 'DELETE_TODO',
      id: id
    }
  },

  createUserID: function () {
    return {
      type: 'CREATE_USER_ID',
      id: Math.floor(Math.random() * 100)
    }
  },

  createNewUserIDIfOdd: function () {
    return (dispatch, getState) => {
      const { user } = getState()
      if (user.id % 2 === 0) {
        return;
      }
      dispatch(actions.createUserID());
    }
  },

  createNewUserIDAsync: function () {
    return (dispatch) => {
      setTimeout(() => {
        dispatch(actions.createUserID());
      }, 2500);
    }
  }
};
export default actions;
