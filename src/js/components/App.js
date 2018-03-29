import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import mainFontFamily from '../../css/fonts/ProximaNovaRegular.ttf';

import routes from '../routes/routes';
import Navbar from './main/navbar/Navbar';

import { showNavbarAction, hideNavbarAction } from '../actions/navbarAction';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.showNavbar && <Navbar />}
                <Switch>
                    {routes.map((route) => (
                    <Route exact
                        key={route.path}
                        path={route.path}
                        component={route.component}
                    />
                    ))}
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
};

export default withRouter(connect(mapStateToProps)(App));