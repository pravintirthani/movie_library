import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import CombineReducer from './CombineReducer';
import "bootstrap/scss/bootstrap.scss"
import "./scss/index.scss";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFilm,faSignInAlt} from '@fortawesome/free-solid-svg-icons'
library.add(faFilm,faSignInAlt)

const store = createStore(CombineReducer,applyMiddleware(
    thunkMiddleware
  ));
  
ReactDOM.render(<Routes store={store} />, document.getElementById('root'));