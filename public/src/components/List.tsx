import * as React from 'react';
import { connect } from 'react-redux';
import { fetchTransactions,changeListCurrency } from '../actions';
import * as dateFormat from 'dateformat';
import currencySymbols from '../util/symbols';
import round from '../util/round';

import Transaction from '../components/Transaction';

function mapStateToProps(state: any) {
    const { isFetching, didInvalidate, transactions, items, listCurrency } = state.purchase;

    return {
        isFetching, didInvalidate, transactions, items, listCurrency
    }
}

class List extends React.Component<any, any>{
    _onListCurrencyChange(evt:any){
        const value=evt.target.value;
        this.props.dispatch(changeListCurrency(value))
    }
    componentWillMount() {
        this.props.dispatch(fetchTransactions())
    }
    render() {
        const {listCurrency,items} = this.props;
        return (<div>
            <h1 className="display-5 m-2">Transaction History</h1>
            <table className="table-inverse m-2">
                <thead>
                    <tr style={{ color: '#009688' }} className="p-2">
                        <th className="p-2">Date</th>
                        <th className="p-2">Transaction</th>
                        <th className="p-2">Amount
                            <select className="form-control-sm m-2" value={listCurrency} onChange={this._onListCurrencyChange.bind(this)}>
                                {Object.keys(this.props.items).map((currency: string, idx: number) => {
                                    return (<option key={idx} value={currency}>
                                        {currency}
                                    </option>)
                                })}
                            </select>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.transactions.map((trans: any, index: number) => {
                        const { date, transaction, concept, amount } = trans;
                        return (<tr key={index}>
                            <td className="p-2">{dateFormat(date, 'dd/mm/yyyy')}</td>
                            <td className="p-2">{transaction}/{concept}</td>
                            <td className="p-2">{round(amount*items[listCurrency])} {currencySymbols[listCurrency]} {listCurrency}</td>
                        </tr>)
                    })}
                    <tr>
                        <td colSpan={3}>
                        <Transaction />
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
        )
    }
}
export default connect(mapStateToProps)(List);