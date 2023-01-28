import createDataContext from './createDataContext'

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
}

export const { Provider, Context } = createDataContext(
    productReducer,
    { update },
    null
)
