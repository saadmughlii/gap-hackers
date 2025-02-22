import React from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase.js';
import { Button } from '@mui/material';


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
        <div>
           <Button onClick={signInWithGoogle}>Sign In With Google</Button>
        </div>
    );
}

export default SignIn;
