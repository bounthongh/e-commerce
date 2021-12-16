import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
} from 'react-router-dom';

import routes from "../../config/routes";
import Cookies from 'js-cookie';

const PublicRoute = ({layout: Layout, components: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
        <Layout components={Component}  {...props} {...rest} />
    )}/>
);

const PrivateRoute = ({layout: Layout,  components: Component, breads: breads, ...rest}) => (
    <Route {...rest} render={(props) => (
        Cookies.get('accessToken')
            ? <Layout components={Component} breads={breads} {...props} {...rest}  />
            : <Redirect 
                to={{
                pathname: '/login',
                state: {from: props.location}
            }}/>
    )}/>
);

export default function MainRouter() {
    return (
        <Router>
            {routes.map(route =>
                route.private === true ?
                    <PrivateRoute
                        exact
                        key={route.path}
                        path={route.path}
                        layout={route.layout}
                        components={route.components}
                        breads={route.breads}
                    />
                    :
                    <PublicRoute
                        exact
                        key={route.path}
                        path={route.path}
                        layout={route.layout}
                        components={route.components}
                        breads={route.breads}
                    />
            )}
        </Router>
    )
}