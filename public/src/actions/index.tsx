import 'whatwg-fetch';

export function fetchRates(){
  return (dispatch:any)=>{
    fetch('latest.json')
    .then(response=>response.json())
    .catch((error)=>{
      dispatch({type:'FETCH_RATES_FAILED'})
    })
    .then(data=>{
      dispatch({type:'FETCH_RATES_FULFILLED',payload:data})
    })
  }
}

export function login(username:string,password:string){
  const userLogin={username,password}
  return (dispatch:any)=>{
    dispatch({type:'LOGIN_REQUEST',payload:userLogin});
    fetch('latest.json')
    .then(
      ()=>{
        dispatch({type:'LOGIN_REQUEST_FULFILLED'});
       
      }
    )
    .catch(
       ()=>{dispatch({type:'LOGIN_REQUEST_FAILED'})}
    )
  }
}

export function changeForm(newState:any) {
  return { type: 'CHANGE_FORM', newState };
}

export function changeCalculator(newState:any){
  return {type:'CHANGE_CALCULATOR',newState};
}

export function changeValue(newValue:number){
  return {type:'CHANGE_VALUE',newValue};
}