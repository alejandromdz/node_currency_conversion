
const transaction = (state: any = {
    isFetching:false,
    didInvalidate: false,
    transactionData: {
        transaction: 'Purchase',
        concept: 'DSW Shoes',
        amount:0
    }
}, action: any = { type: '' }) => {
    switch (action.type) {
        case 'CHANGE_TRANSACTION':
            return {
                ...state,
                transactionData: action.newState
            }
        case 'POST_TRANSACTION':
            return {
                ...state,
                isFetching: true
            }
        case 'POST_TRANSACTION_FULFILLED':
            return {
                ...state,
                isFetching: false
            }
        case 'POST_TRANSACTION_FAILED':
            return {
                ...state,
                isFetching: false,
                didInvalidate: true
            }
        default: return state;
    }
}

export default transaction