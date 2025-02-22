import React from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Button } from '@mui/material';
import './SignIn.css';

function SignIn() {
    // Initialize the Firebase Auth object
    const auth = getAuth();

    function signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log(result.user);
                // Handle successful login (e.g., store user info, redirect, etc.)
            })
            .catch((error) => {
                console.error(error);
                // Handle errors here (e.g., show an error message)
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
