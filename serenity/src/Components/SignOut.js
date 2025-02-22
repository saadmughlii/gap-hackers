import React from 'react';
import { Button } from '@mui/material';
import { auth } from '../firebase.js';

function SignOut() {
    const handleSignOut = () => {
        auth.signOut().then(() => {
            console.log("User signed out");
        }).catch(error => console.error("Sign out error:", error));
    };

    return (
        <div>
            <Button onClick={handleSignOut}>Sign Out</Button>
        </div>
    );
}

export default SignOut;
