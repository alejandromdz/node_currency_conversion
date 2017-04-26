import * as React from 'react';
import { connect } from 'react-redux';
import { changeCalculator ,changeValue} from '../actions';
function mapStateToProps(state: any) {
    const { items, calculatorData ,value} = state.purchase
    return { items, data: calculatorData,value }
}

class Calculator extends React.Component<any, any>{

    _changeFromCurrency(evt: any) {
        var newState = this._mergeWithCurrentState({
            fromCurrency: evt.target.value
        });

        this._emitChange(newState);
    }
    _changeToCurrency(evt: any) {
        var newState = this._mergeWithCurrentState({
            toCurrency: evt.target.value
        });

        this._emitChange(newState);
    }
    _mergeWithCurrentState(change: any) {
        return { ...this.props.data, ...change };
    }

    _emitChange(newState: any) {
        this.props.dispatch(changeCalculator(newState));
    }
    _onValueChange(evt:any){
        const value=evt.target.value;
       
       if(isFinite(value))
       {   
           this.props.dispatch(changeValue(value));
       }

    }
    render() {
        return (
            <div>
                <select value={this.props.data.fromCurrency} onChange={this._changeFromCurrency.bind(this)}>
                    {Object.keys(this.props.items).map((currency: string, idx: number) => {
                        return (<option key={idx} value={currency}>
                            {currency}
                        </option>)
                    })}
                </select>

                <input
                    className="c-field c-field--xlarge"
                    type="text"
                    value={this.props.value}
                    onChange={this._onValueChange.bind(this)}
                    onBlur={this._onValueChange.bind(this)}
                />
                <select value={this.props.data.toCurrency} onChange={this._changeToCurrency.bind(this)}>
                    {Object.keys(this.props.items).map((currency: string, idx: number) => {
                        return (<option key={idx} value={currency}>
                            {currency}
                        </option>)
                    })}
                </select>
                {this.props.value*this.props.items[this.props.data.toCurrency]/this.props.items[this.props.data.fromCurrency]}
            </div>
        )
    }
}

export default connect(mapStateToProps)(Calculator)