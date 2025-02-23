import React, { useState } from 'react';

function MessageAI() {
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! How can I help you today?', sender: 'AI' }
  ]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (msg.trim() !== '') {
      const newMessage = { id: messages.length + 1, text: msg, sender: 'User' };
      setMessages([...messages, newMessage]);
      setMsg('');

      // Make API call to backend to get AI response
      try {
        const response = await fetch('http://localhost:5000/get_response', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
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
    }
  };

  return (
    <div>
      <div className="messages">
        {messages.map((message) => (
          <div key={message.id} className={`msg ${message.sender === 'User' ? 'sent' : 'received'}`}>
            <p>{message.text}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default MessageAI;
