import * as React from 'react';
import { connect } from 'react-redux';
import { changeCalculator, changeValue, fetchRates } from '../actions';
import currencySymbols from '../util/symbols'
import round from '../util/round'

function mapStateToProps(state: any) {
    const { items, calculatorData, value } = state.purchase
    return { items, data: calculatorData, value }
}

class Calculator extends React.Component<any, any>{
    componentWillMount() {
        this.props.dispatch(fetchRates());
    }
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
    _onValueChange(evt: any) {
        const value = evt.target.value;

        if (isFinite(value)) {
            this.props.dispatch(changeValue(value));
        }

    }
    render() {
        const rate = this.props.items[this.props.data.toCurrency] / this.props.items[this.props.data.fromCurrency];
        const tatgetCurrency: string = this.props.data.toCurrency;
        return (
            <form className="form-inline m-2">
                <label htmlFor="currency-convert">Convert </label>
                <input
                    id="currency-convert"
                    type="text"
                    value={this.props.value}
                    onChange={this._onValueChange.bind(this)}
                    onBlur={this._onValueChange.bind(this)}
                    className='m-2 form-control' />
                    <label htmlFor="from-currency"> from </label>
                <select id="from-currency" className='m-2 form-control' value={this.props.data.fromCurrency} onChange={this._changeFromCurrency.bind(this)}>
                    {Object.keys(this.props.items).map((currency: string, idx: number) => {
                        return (<option key={idx} value={currency}>
                            {currency}
                        </option>)
                    })}
                </select>

                <label htmlFor="to-currency"> to </label>
                <select id="to-currency" className='m-2 form-control' value={this.props.data.toCurrency} onChange={this._changeToCurrency.bind(this)}>
                    {Object.keys(this.props.items).map((currency: string, idx: number) => {
                        return (<option key={idx} value={currency}>
                            {currency}
                        </option>)
                    })}
                </select>
                {tatgetCurrency} {currencySymbols[tatgetCurrency]} {round(this.props.value * rate)}
                <br />
                Rate:{round(rate)}
            </form>
        )
    }
}

export default connect(mapStateToProps)(Calculator)