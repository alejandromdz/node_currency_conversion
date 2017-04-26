import * as React from 'react';
import { connect } from 'react-redux';
import { fetchRates } from '../actions';


function mapStateToProps(state: any) {
    const { isFetching, didInvalidate, items } = state.purchase;
    return {
        isFetching, didInvalidate, items
    }
}

class List extends React.Component<any, any>{
    componentWillMount() {
        this.props.dispatch(fetchRates());
    }
    render() {
        return (<div>
            <h1 className="display-4">Transaction History</h1>
            <table className="table-inverse">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Transaction</th>
                        <th>Ammount</th>
                    </tr>
                </thead>
                <tbody>
               
                </tbody>
            </table>
            </div>
        )
    }
}
export default connect(mapStateToProps)(List);