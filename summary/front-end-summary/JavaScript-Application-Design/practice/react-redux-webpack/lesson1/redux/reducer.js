function getId(state) {
    return state.todos.reduce((maxId, todo) => {
        return Math.max(todo.id, maxId)
    }, -1) + 1
}

function reducer(state, action) {
    switch (action.type) {
        case 'ADD_TODO':
            return Object.assign({}, state, {
                todos: [{
                    text: action.text,
                    compiled: false,
                    id: getId(state)
                }, ...state.todos]
            })
            break;
        case 'COMPLETE_TODO':
            return Object.assign({}, state, {

            });
            break;
        case 'DELETE_TODO':
            return Object.assign({}, state, {

            });
            break;
        default:
            return state;
    }
}
export default reducer;
