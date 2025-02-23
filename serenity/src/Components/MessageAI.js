import React, { useState } from 'react';

function MessageAI() {
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState([{ id: 1, text: 'Hello! My name is Serenity 🥰. Please tell me your name', sender: 'AI' }]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!msg.trim()) return;

    const newMessage = { id: messages.length + 1, text: msg, sender: 'User' };
    setMessages([...messages, newMessage]);
    setMsg('');

    try {
      const response = await fetch('http://localhost:5000/get_response', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg }),
      });

      const data = await response.json();
      if (data.response) {
        const aiMessage = { id: messages.length + 2, text: data.response, sender: 'AI' };
        setMessages((prevMessages) => [...prevMessages, aiMessage]);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="ai-chat">
      <div className="ai-chat-messages">
        {messages.map((message) => (
          <div key={message.id} className={`msg ${message.sender === 'User' ? 'sent' : 'received'}`}>
            <p>{message.text}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage} className="ai-chat-form">
        <input
          type="text"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="What's on your mind?"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default MessageAI;
