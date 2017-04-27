import * as React from 'react';
import LoginForm from '../components/LoginForm'
import List from '../components/List';
import Calculator from '../components/Calculator';
import Transaction from '../components/Transaction'
import {connect} from 'react-redux';

function mapStateToProps(state: any) {
    const { isLogged } = state.login;
    return {
        isLogged
    }
}

class App extends React.Component<any,any>{
    
    render(){
        //if (this.props.isLogged)
        if(true)
        return(
            <div>
            <List/>
            <Transaction/>
            <Calculator/>
            </div> 
        )
        else return (
            <LoginForm/>
        )
    }
}

export default connect(mapStateToProps)(App);