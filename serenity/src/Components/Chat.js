import React, { useState, useEffect, useRef } from 'react';
import { db, collection, query, orderBy, limit, onSnapshot } from '../firebase.js';
import { auth } from '../firebase.js';
import SignOut from './SignOut';
import SendMessage from './SendMessage';
import MessageAI from './MessageAI'; // Import your MessageAI component
import './Chat.css'; // Import the CSS file


function Chat() {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null); // Ref for smooth scrolling

  useEffect(() => {
    const messagesRef = collection(db, "messages");
    const q = query(messagesRef, orderBy("createdAt"), limit(50));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Scroll to bottom when messages update
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
<<<<<<< Updated upstream
  <div className="chat">
    <h1 className="chat-title dancing-script">Serenity Chat 🌿</h1> {/* Title with Dancing Script font */}
    <SignOut />
    <div className="messages">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`msg ${message.uid === auth.currentUser.uid ? 'sent' : 'received'}`}
        >
          {message.photoURL && <img src={message.photoURL} alt="User Avatar" />}
          <p>{message.text}</p> 
=======
      <div className="chat">
        <h1 className="chat-title dancing-script">Chat 🌿</h1> {/* Title with Dancing Script font */}
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
          {/* Invisible div for smooth scrolling */}
          <div ref={messagesEndRef} />
>>>>>>> Stashed changes
        </div>
<<<<<<< Updated upstream
      ))}
      {/* Invisible div for smooth scrolling */}
      <div ref={messagesEndRef} />
    </div>
    <SendMessage auth={auth} />  
  </div>
      <div className="small-box" />
      <div> <button class="talk-ai-button"> Talk To Serenity AI</button></div>
  </>

);
=======
        <SendMessage auth={auth} />
      </div>
      
      {/* AI Chat Component */}
      <div className="small-box">
  <div className="ai-chat">
    <h1 className="chat-title-serenity sacramento-regular">Talk with Serenity</h1>
    <div className="ai-chat-messages">
      <MessageAI /> {/* Ensure this component properly renders messages */}
    </div>
  </div>
</div>

    </>
  );
>>>>>>> Stashed changes
}

export default Chat;
