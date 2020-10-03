import React from "react";
import jwtDecode from 'jwt-decode';
import { Route, Redirect } from "react-router-dom";

export default ({ component: Component, user, ...rest }) => {
    const checkAuth = () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const decodedToken = jwtDecode(token);
                const now = new Date().getTime() / 1000;
                if (now < decodedToken.exp) {
                    return true;
                }

            }
            return false;
        } catch (error) {
            return false
        }
    }

    return (
        <Route
            {...rest}
            render={props =>
                checkAuth() === true
                    ? <Component {...props} />
                    : <Redirect to="/login" />
            }
        />
    );
}