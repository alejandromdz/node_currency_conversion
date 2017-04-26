
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
            <form className="form" autoComplete="off" onSubmit={this._onSubmit.bind(this)}>
                <div className="form-group row">
                    <label className="col-2 col-form-label" htmlFor="username">Username</label>
                    <div className="">
                        <input className="form-control"
                            type="text"
                            id="username"
                            value={this.props.data.username}
                            placeholder="frank.underwood"
                            autoComplete="off"
                            autoCorrect="off"
                            autoCapitalize="off"
                            spellCheck={false}
                            onChange={this._changeUsername.bind(this)} />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-2 col-form-label" htmlFor="password">Password</label>
                    <div>
                        <input className="form-control"
                            id="password"
                            type="password"
                            value={this.props.data.password}
                            autoComplete="off"
                            placeholder="••••••••••"
                            onChange={this._changePassword.bind(this)} />
                    </div>
                </div>
                <div className="form-group">
                    <button className="btn btn-primary"
                        type="submit"
                        disabled={this.props.isRequesting}>Login</button>
                </div>
            </form>
        );
    }
}



export default connect(mapStateToProps)(LoginForm);