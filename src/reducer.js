export const initialState = {
    user: undefined,
    token: undefined,
    cart: [],
    selected: undefined,
    searchItems: [],
    sideBarVisible: false,
    tempCart: []
}

export const getCartTotal = (cart)=>{
    return cart?.reduce((total, item)=> item.price+total, 0)
}

function reducer(state, action){
    switch(action.type){
        case 'set-token':
            return {
                ...state, token:action.token.token
            }
        case 'set-user':
            return {...state, user: action.user}
        case 'add-to-cart':
            return {...state, cart:[...state.cart, action.item]}
        case 'add-to-tempCart':
            return {...state, tempCart:[...state.tempCart, action.item]}
        case 'delete-from-cart':
            let newCart = state.cart.filter(item=>item.id !== action.id)
            return {...state, cart:newCart}
        case 'delete-from-tempCart':
            console.log(action.id)
            let newTempCart = state.tempCart.filter(item=>item.id !== action.id)
            return {...state, tempCart:newTempCart}
        case 'empty-cart':
            return {...state, cart:[]}
        case 'set-cart':
            return {...state, cart:action.cart}
        case 'set-selected':
            return {...state, selected: action.selected}
        case 'set-search':
            return {...state, searchItems: action.searchItems}
        case 'set-sidebar':
            return {...state, sideBarVisible: action.value}
        default:
            return state
    }
}

export default reducer