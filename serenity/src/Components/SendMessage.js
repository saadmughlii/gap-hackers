import React, { useState } from 'react';
import { db, collection, addDoc, serverTimestamp } from '../firebase.js'; 
import { Input, Button, Box, Avatar } from '@mui/material';
import { styled } from '@mui/system';

const MessageContainer = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    padding: '8px',
    borderTop: '1px solid #ccc',
    backgroundColor: '#f9f9f9',
    position: 'fixed',
    bottom: 0,
    width: '100%',
    left: 0,
});

const StyledInput = styled(Input)({
    flex: 1,
    marginRight: '8px',
    '& .MuiInputBase-input': {
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        '&:focus': {
            borderColor: '#3f51b5',
            outline: 'none',
        },
    },
});

const StyledButton = styled(Button)({
    backgroundColor: '#3f51b5',
    color: '#fff',
    '&:hover': {
        backgroundColor: '#303f9f',
    },
});

function SendMessage({ auth }) {
    const [msg, setMsg] = useState('');

    async function sendMessage(e) {
        e.preventDefault();
        if (!msg.trim()) return; // Prevent empty messages

        const { uid, photoURL } = auth.currentUser;

        try {
            await addDoc(collection(db, 'messages'), {
                text: msg,
                photoURL,
                uid,
                createdAt: serverTimestamp(),
            });
            setMsg('');
        } catch (error) {
            console.error("Error sending message: ", error);
        }
    }

    const userPhoto = auth.currentUser?.photoURL;

    return (
        <MessageContainer>
            {userPhoto && <Avatar src={userPhoto} alt="User" sx={{ width: 50, height: 50, marginRight: 2 }} />}
            <form onSubmit={sendMessage} style={{ display: 'flex', flex: 1 }}>
                <StyledInput 
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)} 
                    placeholder="Message..." 
                    fullWidth
                />
                <StyledButton type="submit">Send</StyledButton>
            </form>
        </MessageContainer>
    );
}

export default SendMessage;
