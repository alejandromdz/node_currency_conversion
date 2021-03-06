
const purchase = (state: any = {
    isFetching: false,
    didInvalidate: false,
    items: [],
    transactions:[],
    calculatorData:{fromCurrency:'USD',toCurrency:'USD'},
    value:0,
    listCurrency:'USD'
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
        case 'CHANGE_CALCULATOR':
        return {
            ...state,
            calculatorData:{
                ...action.newState
            }
        }
        case 'CHANGE_VALUE':
        return{
            ...state,
            value:action.newValue
        }
        case 'FETCH_TRANSACTIONS_FULFILLED':
        return{
            ...state,
            transactions:action.payload
        }
         case 'POST_TRANSACTION_FULFILLED':
            return {
                ...state,
                transactions:action.payload
            }
        case 'CHANGE_LIST_CURRENCY':
            return{
                ...state,
                listCurrency:action.newValue
            }
        default: return state;
    }
}

export default purchase;