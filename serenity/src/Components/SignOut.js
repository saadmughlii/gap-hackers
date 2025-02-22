import React from 'react';
import { auth } from '../firebase.js';

function SignOut() {
    const handleSignOut = () => {
        auth.signOut()
            .then(() => {
                console.log("User signed out");
            })
            .catch(error => console.error("Sign out error:", error));
    };

    return (
        <button className="sign-out-button" onClick={handleSignOut}>
            Sign Out
        </button>
    );
}

export default SignOut;
