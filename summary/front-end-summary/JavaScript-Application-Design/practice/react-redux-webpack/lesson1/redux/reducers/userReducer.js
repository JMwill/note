function userReducer(user = {}, action) {
    switch (action.type) {
        case 'CREATE_USER_ID':
            return Object.assign({}, user, {
                username: user.username,
                id: action.id
            });
            break;
        default:
            return user;
    }
}
export default userReducer;
