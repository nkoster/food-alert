import createDataContext from './createDataContext'
import {saveProduct} from '../api'

const productReducer = (state, action) => {
    switch(action.type) {
        case 'update':
            return action.payload
        default:
            return state
    }
}

const update = dispatch => (product) => {
    dispatch({ type: 'update', payload: product })
    saveProduct(product).catch(error => console.error(error))
}

export const { Provider, Context } = createDataContext(
    productReducer,
    { update },
    null
)
