import React from 'react';
import axios from 'axios';
import { Link,Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import jwt_decode from 'jwt-decode';

import { showNavbarAction, hideNavbarAction } from '../../../actions/navbarAction';

import { setImage } from '../../../helpers/restSet';
import { authorization } from '../../../helpers/restGet';

class User extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            imageUrl: '',
            errorMessage: '',
            successMessage: ''
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeUrl = this.onChangeUrl.bind(this);
    }

    componentDidMount() {
        authorization(this);
    }

    onSubmit(event) {
        event.preventDefault();

        let errorMessage = '';

        if(this.state.imageUrl === '') {
            errorMessage = 'Url address is required';
        }

        this.setState({
            errorMessage: errorMessage,
            successMessage: ''
        });

        if(errorMessage === '') {
            setImage(this);
        }
    }

    onChangeUrl(event) {
        this.setState({
            imageUrl: event.target.value
        });
    }

    render() {
        return (
            <div className='user-box'>
                <div>
                    <div className="right-place-link"><Link to='/userimage'>Images</Link></div>
                    <h3 className="center-text">User Insert Image</h3>
                    <form onSubmit={this.onSubmit}>
                        <div><input type="text" onChange={this.onChangeUrl} value={this.state.imageUrl} className="login-form" name="imageUrl" placeholder="Url adress to image here..." /></div>
                        <div><button className="login-form margin-top">Insert Image</button></div>
                        {this.state.errorMessage && <div style={{ color: 'red' }}>{this.state.errorMessage}</div>}
                        {this.state.successMessage && <div style={{ color: 'green' }}>{this.state.successMessage}</div>}
                    </form>
                </div>
            </div>
        );
    }
}

const mapActionsToProps = {
    onShowNavbarAction: showNavbarAction,
    onHideNavbarAction: hideNavbarAction
};

export default withRouter(connect(null, mapActionsToProps)(User));