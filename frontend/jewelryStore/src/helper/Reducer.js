export const initialState = {
    message: null,
    user: null,
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "login":
            return action.payload
        case "register":
            return action.payload
        case "logout":
            return null
        case "change":
            return action.payload
        case "delete":
            return action.payload
        default:
            return state
    }
}