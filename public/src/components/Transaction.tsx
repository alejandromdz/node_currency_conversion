
import * as React from 'react';
import {connect} from 'react-redux';
import {changeTransaction,postTransaction} from '../actions';

function mapStateToProps(state:any){
   const { isFetching, didInvalidate, transactionData } = state.transaction;
    return {
        isFetching, didInvalidate,data:transactionData
    }
}

class Transaction extends React.Component<any,any>{
    _onSubmit(evt: any) {
        evt.preventDefault();
        this.props.dispatch(postTransaction(this.props.data));
    }
    _changeAmmount(evt:any){
         const value=evt.target.value;
      
       if(isFinite(value))
       { 
           var newState=this._mergeWithCurrentState({
            amount:value
        });
        console.log(newState)
            this._emitChange(newState) 
        }
    }
    _changeConcept(evt:any){
        var newState=this._mergeWithCurrentState({
            concept:evt.target.value
        });
        this._emitChange(newState);
    }
    _changeTransaction(evt:any){
        var newState=this._mergeWithCurrentState({
            transaction:evt.target.value
        });
        this._emitChange(newState);
    }
    _mergeWithCurrentState(change: any) {
        return { ...this.props.data, ...change };
    }
    _emitChange(newState: any) {
        this.props.dispatch(changeTransaction(newState));
    }

    render(){
        return(
             <form className="form-inline" onSubmit={this._onSubmit.bind(this)}>
            <select value={this.props.data.transaction} onChange={this._changeTransaction.bind(this)} className="form-control m-2">
                <option value="Purchase">Purchase</option>
                <option value="Refund">Refund</option>
                <option value="Transfer">Transfer</option>
            </select>
            <select value={this.props.data.concept} onChange={this._changeConcept.bind(this)} className="form-control m-2">
                <option value="DSW Shoes">DSW shoes</option>
                <option value="Macys">Macys</option>
                <option value="Home Depot">Home Depot</option>
                <option value="Jamba Juice">Jamba Juice</option>
                <option value="Wells Fargo">Wells Fargo</option>

                </select>
                <input className="form-control m-2" type="text"
                        onChange={this._changeAmmount.bind(this)}
                        onBlur={this._changeAmmount.bind(this)}
                        value={this.props.data.amount}/>
                <input className="form-control btn btn-primary m-2" type="submit"/>
</form>
        )
    }
}

export default connect(mapStateToProps)(Transaction);