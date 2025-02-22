import React, { useState } from 'react';
import { db, collection, addDoc, serverTimestamp } from '../firebase.js'; 
import { Avatar } from '@mui/material'; // Only import Avatar as it's used

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
        <div className="send-message">
            {userPhoto && <Avatar src={userPhoto} alt="User" sx={{ width: 50, height: 50, marginRight: 2 }} />}
            <form onSubmit={sendMessage} style={{ display: 'flex', flex: 1 }}>
                <input 
                    className="styled-input" 
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)} 
                    placeholder="Type your message..." 
                />
                <button className="styled-button" type="submit">Send</button>
            </form>
        </div>
    );
}

export default SendMessage;
