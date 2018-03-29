import React from 'react';
import axios from 'axios';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { showNavbarAction, hideNavbarAction } from '../../actions/navbarAction';

import Logo from '../logo/Logo';

import { registerAndLogin } from '../../helpers/restSet';

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            errorMessages: []
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onSubmit(event) {
        event.preventDefault();

        const errorMessages = [];

        if(this.state.name === '') {
            errorMessages.push('Name is required');
        }

        if(this.state.email === '') {
            errorMessages.push('Email is required');
        }

        if(this.state.password === '') {
            errorMessages.push('Password is required');
        }

        if(this.state.passwordConfirmation === '') {
            errorMessages.push('Password confirmation is required');
        }

        if(this.state.password !== this.state.passwordConfirmation) {
            errorMessages.push('Password and confirmation not the same');
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
            registerAndLogin(this);
        }
    }

    onCloseModalWindow() {
        const modal = document.querySelector('.modal');
        modal.style.display = "none";
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
                    <div className='register-box'>
                        <div className='right-place-link'><Link to='/login'>Login</Link></div>
                        <Logo />
                        <div><input onChange={this.onChange} value={this.state.name} type="text" className="login-form" name="name" placeholder="Full name here..." /></div>
                        <div><input onChange={this.onChange} value={this.state.email} type="email" className="login-form" name="email" placeholder="Email here..." /></div>
                        <div><input onChange={this.onChange} value={this.state.password} type="password" className="login-form" name="password" placeholder="Password here..." /></div>
                        <div><input onChange={this.onChange} value={this.state.passwordConfirmation} type="password" className="login-form" name="passwordConfirmation" placeholder="Password Confirmation here..." /></div>
                        <div><button className="login-form margin-top">Register</button></div>
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

export default withRouter(connect(null, mapActionsToProps)(Register));