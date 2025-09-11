import React, { useState, useRef, useEffect } from 'react';
import './ChatMessage.css';
import { selectedChatIde } from '../../store/Slicees/chatSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addNewMessage } from '../../store/Slicees/chatSlice';

 // problem is chat input ke vaja se component re render ho rha hae  or messages to use react.memo use karna padega ya fir react-hook-form use karna padega ya fir ref use karna padega

export default function ChatMessages({Messages ,socketInstance,socket,desktop}) {
  const dispatch = useDispatch();
  const [messages, setMessages] = useState(Messages);
  const chatId = useSelector((state) => state.chat.selectedChatId);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
 const messagesContainerRef = useRef(null);

  useEffect(() => {
    const handleAiResponse = (data) => {
      console.log("AI Response:", data);
      dispatch(addNewMessage({
        _id: Date.now().toString(),
        content: data.content,
        chat: chatId,
        role: "model",
      }));
      if(data){

        setLoading(false);  
      }
    };

    socketInstance.on("ai-repsonces", handleAiResponse);

    // if (messagesEndRef.current) {
    //   messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    // }
     if (messagesContainerRef.current) {
  messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
}

    // cleanup listener when component unmounts OR chatId changes
    return () => {
      socketInstance.off("ai-response", handleAiResponse);
    };        
  }, [chatId, messages]);

 



  const handleSend = () => {
    if (!input.trim()) return;
    setLoading(true);
    socket.emit('ai-message', {
      chat: chatId,
      content: input
    });
    dispatch(addNewMessage({
      _id: Date.now().toString(),  // temp id jab tak page reload page reload ke baad sahi id mil jaye backend se
      content: input,
      chat: chatId,
      role: "user",
    }));
    setInput('');

  };

  

  return (
    <div className=''>
   
      <div style={{
        width: desktop ? '80%' : '100%'
      }} className={`chat-slider open   ` }>

        <div className="chat-slider-header"> 
          <span className='px-7'>

          Cyber-ai
          </span>
          </div>
        <div className="chat-slider-messages" ref={messagesContainerRef}>
          {Messages.map((msg, idx) => (
            <div
              key={idx}
              className={`chat-message ${msg.role === 'user' ? 'user' : 'model'}`}
            >
              {msg.content}
            </div>
          ))}
          {loading && (
            <div className="chat-message model typing-bubble">
              <span className="typing-indicator">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* input messages */}
        <div className="chat-slider-input">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
          >

          </input>
         {desktop&&
         <button onClick={handleSend}>Send</button>
         } 
         {/* <button onClick={handleSend}>Send</button> */}

        </div>
      </div>
    </div>
  );
}








