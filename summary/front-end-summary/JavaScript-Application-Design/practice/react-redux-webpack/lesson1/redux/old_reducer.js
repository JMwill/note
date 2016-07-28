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
            });
            break;
        case 'COMPLETE_TODO':
            return Object.assign({}, state, {
                todos: state.todos.map((todo) => {
                    return todo.id === action.id ?
                        Object.assign({}, todo, {compiled: !todo.compiled}) :
                        todo
                })
            });
            break;
        case 'DELETE_TODO':
            return Object.assign({}, state, {
                todos: state.todos.filter((todo) => {
                    return todo.id != action.id;
                })
            });
            break;
        case 'CREATE_USER_ID':
            return Object.assign({}, state, {
                user: {
                    username: state.user.username,
                    id: action.id
                }
            });
            break;
        default:
            return state;
    }
}
export default reducer;
