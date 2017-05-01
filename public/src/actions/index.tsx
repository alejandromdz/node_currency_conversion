import 'whatwg-fetch';
import { Store } from 'react-redux'

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
    fetch('/api/transactions/all', { credentials: "same-origin" })
      .then(res => res.json())
      .catch((error) => {
        dispatch({ type: 'FETCH_TRANSACTIONS_FAILED' })
      })
      .then(data => {
        dispatch({ type: 'FETCH_TRANSACTIONS_FULFILLED', payload: data })
      })
  }
}

export function login(username: string, password: string) {
  const userLogin = { username, password };
  return (dispatch: any) => {
    dispatch({ type: 'LOGIN_REQUEST', payload: userLogin });
    fetch('/api/login', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: "same-origin",
      method: 'post',
      body: JSON.stringify(userLogin)
    })
      .then(
      (res) => {
        dispatch({ type: 'LOGIN_REQUEST_FULFILLED' });
      }
      )
      .catch(
      () => { dispatch({ type: 'LOGIN_REQUEST_FAILED' }) }
      )
  }
}

export function postTransaction(data: any, listRate: number) {
  return (dispatch: any) => {
    dispatch({ type: 'POST_TRANSACTION' });
    // Convert to USD before sending
    let { amount, concept, transaction } = data;
    amount = amount / listRate;

    fetch('api/transactions', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify({ amount, concept, transaction })
    })
      .then(response => response.json())
      .catch((error) => {
        dispatch({ type: 'POST_TRANSACTION_FAILED' })
      })
      .then(data => {
        dispatch({ type: 'POST_TRANSACTION_FULFILLED', payload: data })
      })
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

export function changeListCurrency(newValue: any) {
  return { type: 'CHANGE_LIST_CURRENCY', newValue }
}