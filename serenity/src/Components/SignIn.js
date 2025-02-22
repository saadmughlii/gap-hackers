import React from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase.js';
import { Button } from '@mui/material';
import './SignIn.css';

function SignIn() {
    function signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log(result.user);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <div className="signin-container">
            <div className="glass-card">
                <h1 className="signin-title">Welcome to Serenity 🌿</h1>
                <p className="signin-subtext">Connect with friends in a peaceful space.</p>
                <Button className="signin-button" onClick={signInWithGoogle}>
                    Sign In With Google
                </Button>
            </div>
        </div>
    );
}

export default SignIn;
