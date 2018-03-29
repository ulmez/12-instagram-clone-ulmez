import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import mainStyle from '../css/main.css';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { initialState, showNavbarReducer } from './reducers/showNavbarReducer';

const allReducers = combineReducers({
    showNavbar: showNavbarReducer
});

const store = createStore(
    allReducers,
    initialState,
    window.devToolsExtension && window.devToolsExtension()
);

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
), document.getElementById('main'));