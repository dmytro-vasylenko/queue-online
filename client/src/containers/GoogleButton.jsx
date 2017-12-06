import React from "react";
import {GoogleLogin, GoogleLogout} from "react-google-login";

import {GOOGLE_CLIENT_ID} from "../constants/config";

const GoogleButton = props => {
    if (!props.user) {
        return (
            <GoogleLogin
                clientId={GOOGLE_CLIENT_ID}
                buttonText="Login"
                onSuccess={props.onSignIn}
                onFailure={props.onFailure}
            />
        );
    }

    return <GoogleLogout buttonText={props.user.email} onLogoutSuccess={props.onLogout} />;
};

export default GoogleButton;
