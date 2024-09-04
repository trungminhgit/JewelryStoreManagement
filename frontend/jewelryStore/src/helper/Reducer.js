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

export const cartInitState = {
    cart:[]
}

export const cartReducer = (state = cartInitState, action) => {
    switch (action.type){
        case 'add':
            const exitsItem = state.cart.find(item => item.id === action.payload.id)
            if(exitsItem){
                return {
                    ...state,
                    cart: state.cart.map(item => item.id === action.payload.id ? {...item, quantity:item.quantity+1} : item)
                }
            }else{
                return {
                    ...state,
                    cart:[...state.cart,{...action.payload, quantity:1}]
                }
            }
    }
}