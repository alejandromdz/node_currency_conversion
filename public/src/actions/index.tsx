import 'whatwg-fetch';

export function fetchRates() {
  return (dispatch: any) => {
    dispatch({ type: 'FETCH_RATES' })
    fetch('latest.json')
      .then(response => response.json())
      .catch((error) => {
        dispatch({ type: 'FETCH_RATES_FAILED' })
      })
      .then(data => {
        dispatch({ type: 'FETCH_RATES_FULFILLED', payload: data })
      })
  }
}

export function fetchTransactions() {
  return (dispatch: any) => {
    dispatch({ type: 'FETCH_TRANSACTIONS' })
    fetch('/api/transactions/all')
      .then(response => response.json())
      .catch((error) => {
        dispatch({ type: 'FETCH_TRANSACTIONS_FAILED' })
      })
      .then(data => {
        dispatch({ type: 'FETCH_TRANSACTIONS_FULFILLED', payload: data })
      })
  }
}

export function login(username: string, password: string) {
  const userLogin = { username, password }
  return (dispatch: any) => {
    dispatch({ type: 'LOGIN_REQUEST', payload: userLogin });
    fetch('latest.json')
      .then(
      () => {
        dispatch({ type: 'LOGIN_REQUEST_FULFILLED' });

      }
      )
      .catch(
      () => { dispatch({ type: 'LOGIN_REQUEST_FAILED' }) }
      )
  }
}

export function postTransaction(data: any) {
  return (dispatch: any) => {
    dispatch({ type: 'POST_TRANSACTION' });

    var payload = new FormData();
    payload.append("json", JSON.stringify(data));
    fetch('api/transactions', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify(data)
    })
      .then(
      () => {
        dispatch({ type: 'POST_TRANSACTION_FULFILLED' });

      }
      )
      .catch(
      () => { dispatch({ type: 'POST_TRANSACTION_REJECTED' }) }
      )
  }
}

export function changeForm(newState: any) {
  return { type: 'CHANGE_FORM', newState };
}

export function changeCalculator(newState: any) {
  return { type: 'CHANGE_CALCULATOR', newState };
}

export function changeValue(newValue: number) {
  return { type: 'CHANGE_VALUE', newValue };
}

export function changeTransaction(newState: any) {
  return { type: 'CHANGE_TRANSACTION', newState };
}