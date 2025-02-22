import React, { useState, useEffect } from 'react';
import { db, collection, query, orderBy, limit, onSnapshot } from '../firebase.js';
import { auth } from '../firebase.js';
import SignOut from './SignOut';
import SendMessage from './SendMessage';
import './Chat.css'; // Import the CSS file

function Chat() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const messagesRef = collection(db, "messages");
    const q = query(messagesRef, orderBy("createdAt"), limit(50));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="chat">
      <SignOut />
      <div className="messages">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`msg ${message.uid === auth.currentUser.uid ? 'sent' : 'received'}`}
          >
            {message.photoURL && <img src={message.photoURL} alt="User Avatar" />}
            <p>{message.text}</p> 
          </div>
        ))}
      </div>
      <SendMessage auth={auth} />
    </div>
  );
}

export default Chat;
