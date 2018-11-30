function getId(todos) {
    return todos.reduce((maxId, todo) => {
        return Math.max(todo.id, maxId)
    }, -1) + 1
}

function todoReducer(todos = [], action) {
    switch (action.type) {
        case 'ADD_TODO':
            return [{
                text: action.text,
                compiled: false,
                id: getId(todos)
            }, ...todos]
            break;
        case 'COMPLETE_TODO':
            return todos.map((todo) => {
                return todo.id === action.id ?
                    Object.assign({}, todo, {compiled: !todo.compiled}) :
                    todo
            });
            break;
        case 'DELETE_TODO':
            return todos.filter((todo) => {
                return todo.id != action.id;
            })
            break;
        default:
            return todos;
    }
}
export default todoReducer;
