import { } from 'react-router-dom'
const login = (state: any = {
    isLogged: false,
    isRequesting: false,
    didInvalidate: false,
    formState: {
        username: '',
        password: ''
    }
}, action: any = { type: '' }) => {
    switch (action.type) {
        case 'CHANGE_FORM':
            return {
                ...state,
                formState: action.newState
            }
        case 'LOGIN_REQUEST':
            return {
                ...state,
                isRequesting: true
            }
        case 'LOGIN_REQUEST_FULFILLED':
            return {
                ...state,
                isRequesting: false,
                isLogged: true
            }
        case 'LOGIN_REQUEST_FAILED':
            return {
                ...state,
                isRequesting: false,
                isLogged: false,
                didInvalidate: true
            }
        default: return state;
    }
}

export default login