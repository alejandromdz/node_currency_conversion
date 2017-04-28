
import * as React from 'react';
import { connect } from 'react-redux'
import { login, changeForm } from '../actions';

function mapStateToProps(state: any) {
    const { isLogged, didInvalidate, formState, isRequesting } = state.login;
    return {
        isLogged, didInvalidate, data: formState, isRequesting
    }
}

class LoginForm extends React.Component<any, void> {
    _onSubmit(evt: any) {
        evt.preventDefault();
        this.props.dispatch(login(this.props.data.username, this.props.data.password));
    }
    _changeUsername(evt: any) {
        var newState = this._mergeWithCurrentState({
            username: evt.target.value
        });

        this._emitChange(newState);
    }
    _changePassword(evt: any) {
        var newState = this._mergeWithCurrentState({
            password: evt.target.value
        });

        this._emitChange(newState);
    }
    _mergeWithCurrentState(change: any) {
        return { ...this.props.data, ...change };
    }

    _emitChange(newState: any) {
        this.props.dispatch(changeForm(newState));
    }

    render() {
        return (
                <form className="form d-flex flex-column h-100 align-items-center justify-content-center" autoComplete="off" onSubmit={this._onSubmit.bind(this)}>
                    <div className="d-flex flex-row">
                        <label className="m-2" htmlFor="username">Username</label>
                            <input className="form-control m-2"
                                type="text"
                                id="username"
                                value={this.props.data.username}
                                placeholder="username"
                                autoComplete="off"
                                autoCorrect="off"
                                autoCapitalize="off"
                                spellCheck={false}
                                onChange={this._changeUsername.bind(this)} />
                       
                    </div>
                    <div className="d-flex flex-row">
                        <label className="m-2" htmlFor="password">Password</label>
                        
                            <input className="form-control m-2"
                                id="password"
                                type="password"
                                value={this.props.data.password}
                                autoComplete="off"
                                placeholder="••••••••••"
                                onChange={this._changePassword.bind(this)} />
                        
                    </div>
                    <div className="form-group p-2">
                        <button className="btn btn-primary p-2"
                            type="submit"
                            disabled={this.props.isRequesting}>Login</button>
                    </div>
                </form>
        );
    }
}



export default connect(mapStateToProps)(LoginForm);