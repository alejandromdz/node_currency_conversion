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
        return (
            <ul>
                {Object.keys(this.props.items).map((currency: string, idx: number) => {
                    return (<li key={idx}>
                        {currency}:{this.props.items[currency]}
                    </li>)
                })}
            </ul>
        )
    }
}
export default connect(mapStateToProps)(List);