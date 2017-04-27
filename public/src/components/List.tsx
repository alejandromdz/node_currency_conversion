import * as React from 'react';
import { connect } from 'react-redux';
import { fetchTransactions } from '../actions';
import * as dateFormat from 'dateformat';


function mapStateToProps(state: any) {
    const { isFetching, didInvalidate,transactions } = state.purchase;
    return {
        isFetching, didInvalidate, transactions
    }
}

class List extends React.Component<any, any>{
    componentWillMount(){
        this.props.dispatch(fetchTransactions())
    }
    render() {
        return (<div>
            <h1 className="display-5 m-2">Transaction History</h1>
            <table className="table-inverse m-2">
                <thead>
                    <tr className="p-2">
                        <th className="p-2">Date</th>
                        <th className="p-2">Transaction</th>
                        <th className="p-2">Ammount</th>
                    </tr>
                </thead>
                <tbody>
               {this.props.transactions.map((trans:any,index:number)=>{
                   const {date,transaction,concept,amount}=trans;
                   console.log(date,transaction,concept,amount);
               return (<tr key={index}>
                   <td className="p-2">{dateFormat(date,'dd/mm/yyyy')}</td>
                   <td className="p-2">{transaction}/{concept}</td>
                   <td className="p-2">{amount}</td>
                   
               </tr>)
               })}
                </tbody>
            </table>
           
            </div>
        )
    }
}
export default connect(mapStateToProps)(List);