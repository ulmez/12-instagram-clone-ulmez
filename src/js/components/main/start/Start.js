import React from 'react';
import axios from 'axios';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { showNavbarAction, hideNavbarAction } from '../../../actions/navbarAction';

import { authorization } from '../../../helpers/restGet';

class Start extends React.Component {
    componentDidMount() {
        authorization(this);
    }

    render() {
        return (
            <div className='start-box'>
                <div>
                    <h3 className="center-text">Welcome to Instagram!</h3>
                    <div>Here you can look on other users images. You can also like an image and get comment on it.</div>
                </div>
            </div>
        );
    }
}

const mapActionsToProps = {
    onShowNavbarAction: showNavbarAction,
    onHideNavbarAction: hideNavbarAction
};

export default withRouter(connect(null, mapActionsToProps)(Start));