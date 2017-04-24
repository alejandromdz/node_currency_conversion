

const purchase = (state: any = {
    isFetching: false,
    didInvalidate: false,
    items: []
}, action:any = { type: '' }) => {
    switch (action.type) {
        case 'FETCH_RATES_FAILED':
            return {
                ...state,
                didInvalidate: true
            }
        case 'FETCH_RATES':
            return {
                ...state,
                isFetching: true,
                didInvalidate: false
            }
        case 'FETCH_RATES_FULFILLED':
            return {
                ...state,
                isFetching: false,
                didInvalidate: false,
                items: action.payload.rates
            }

        default: return state;
    }
}

export default purchase;