import React, { useState } from 'react';
import { db, collection, addDoc, serverTimestamp } from '../firebase.js'; 
import { Input, Button, Box, Avatar } from '@mui/material';
import { styled } from '@mui/system';

const MessageContainer = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    padding: '12px',
    borderTop: '1px solid #ccc',
    backgroundColor: '#f5f7fa',
    position: 'fixed',
    bottom: 0,
    width: '95%',
    left: 0,
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
});

const StyledInput = styled(Input)({
    flex: 1,
    marginRight: '12px',
    '& .MuiInputBase-input': {
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid #ccc',
        backgroundColor: '#fff',
        '&:focus': {
            borderColor: '#6200ea',
            outline: 'none',
        },
    },
});

const StyledButton = styled(Button)({
    backgroundColor: '#6200ea',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '8px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
    '&:hover': {
        backgroundColor: '#3700b3',
        boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.3)',
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
                    placeholder="Type your message..." 
                    fullWidth
                />
                <StyledButton type="submit">Send</StyledButton>
            </form>
        </MessageContainer>
    );
}

export default SendMessage;