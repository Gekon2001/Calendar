import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers/';

import './style.sass';
import Calendar from './containers/Calendar';

const store = createStore(rootReducer);

render( <Provider store={store}><Calendar /></Provider>, document.getElementById('root'));
