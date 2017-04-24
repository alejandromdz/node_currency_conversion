import 'whatwg-fetch';

export const addTodo = (text:string) => ({
  type: 'ADD_TODO',
  
})

export const setVisibilityFilter = (filter:any) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

export const toggleTodo = (id:any) => ({
  type: 'TOGGLE_TODO',
  id
})

export function fetchRates(){
  return (dispatch:any)=>{
    fetch('latest.json')
    .then(response=>response.json())
    .catch((error)=>{dispatch({type:'FETCH_RATES_FAILED'})})
    .then(data=>{dispatch({type:'FETCH_RATES_FULFILLED',payload:data})})
  }
}
