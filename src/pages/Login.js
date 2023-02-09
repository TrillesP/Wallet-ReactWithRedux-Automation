import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addEmail } from '../redux/actions/index'

class Login extends Component{
    state = {
        email:'',
        emailV:false,
        pwV:false,
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const { history, dispatch } = this.props;
        const { email } = this.state;
        dispatch(addEmail(email));
        history.push('/wallet');
    };

    emailValidation = (event) => {
        const { value } = event.target;
        const regexEmail =/^\S+@\S+\.\S+$/;
        this.setState({emailV: false})
        if (regexEmail.test(value)) {
            this.setState({
                emailV: true,
                email: value,
            })
        }
    }

    pwValidation = (event) => {
        const { value } = event.target;
        const regexPw = /^.{6,}$/;
        this.setState({pwV: false})
        if (regexPw.test(value)) {
            this.setState({
                pwV: true,
            })
        }
    }

    render() {
        const { emailV, pwV } = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor='email-input'>E-mail: </label>
                <input
                    name="email-input"
                    type="text"
                    data-testid="email-input"
                    onChange={this.emailValidation}
                />
                <label htmlFor='password-input'>Senha: </label>
                <input
                    name="password-input"
                    type="password"
                    data-testid="password-input"
                    onChange={this.pwValidation}
                />
                <button
                    type="submit"
                    data-testid="login-btn"
                    disabled={ (emailV && pwV)? null : 'disabled'}
                    value="Submit"
                >
                    Login
                </button>
            </form>
        );
    }
}

export default connect()(Login);