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

export const productInitState = {
    productName: null,
    message:null
}

export const productReducer = (state = productInitState, action) => {
    switch (action.type){
        case 'add':
            return action.payload;
        case 'edit':
            return action.payload;
        case 'delete':
            return action.payload;
        default:
            return state
    }
}