import React from 'react';
import axios from 'axios';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Logo from '../logo/Logo';

import { showNavbarAction, hideNavbarAction } from '../../actions/navbarAction';

import { login, checkIfValidToken } from '../../helpers/restGet';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            errorMessages: []
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();

        const errorMessages = [];

        if(this.state.email === '') {
            errorMessages.push('Email is required');
        }

        if(this.state.password === '') {
            errorMessages.push('Password is required');
        }

        this.setState({
            errorMessages: errorMessages
        });

        if(errorMessages.length > 0) {
            this.setState({
                errorMessages: errorMessages
            });
            
            const modal = document.querySelector('.modal');
            modal.style.display = "block";
        } else {
            login(this, errorMessages);
        }
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onCloseModalWindow() {
        const modal = document.querySelector('.modal');
        modal.style.display = "none";
    }

    componentDidMount() {
        if(localStorage.getItem('token')) {
            this.props.onHideNavbarAction();

            checkIfValidToken();
        }
    }

    render() {
        return (
            <div>
                <div className="modal">
                    <div className="modal-content">
                        <span onClick={this.onCloseModalWindow} className="close">&times;</span>
                        {this.state.errorMessages.map((message, i) => (
                            <p key={i} className="red-text">* {message}</p>
                        ))}
                    </div>
                </div>
                <form onSubmit={this.onSubmit}>
                    <div className='login-box'>
                        <div className='right-place-link'><Link to='/'>Register</Link></div>
                        <Logo />
                        <div><input onChange={this.onChange} value={this.state.email} type="email" className="login-form" name="email" placeholder="Email here..." /></div>
                        <div><input onChange={this.onChange} value={this.state.password} type="password" className="login-form" name="password" placeholder="Password here..." /></div>
                        <div><button className="login-form margin-top">Login</button></div>
                    </div>
                </form>
            </div>
        );
    }
}

const mapActionsToProps = {
    onShowNavbarAction: showNavbarAction,
    onHideNavbarAction: hideNavbarAction
};

export default withRouter(connect(null, mapActionsToProps)(Login));