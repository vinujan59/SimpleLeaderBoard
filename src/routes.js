import React, { PropTypes, Component } from 'react';
import { Route, Redirect } from 'react-router';

import Main from './Main/Main';

export default (

    <Route>

        <Route name="home" path="/" component={Main}>

        </Route>
        <Redirect from="*" to="/"/>


    </Route>
);