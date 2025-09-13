import React, { useState, useRef, useEffect } from 'react';
import './ChatMessage.css';
import './ButtonAnimation.css';
import {createNewchats } from '../../store/actions/chataction.jsx'
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { selectedChatIde } from '../../store/Slicees/chatSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addNewMessage } from '../../store/Slicees/chatSlice';
import { FiMessageSquare, FiCpu } from 'react-icons/fi';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";


 // problem is chat input ke vaja se component re render ho rha hae  or messages to use react.memo use karna padega ya fir react-hook-form use karna padega ya fir ref use karna padega

export default function ChatMessages({Messages ,socketInstance,socket,desktop,selectedChatId}) {
  
  const [open,setopen]= useState(false)
 const [selectedModel, setSelectedModel] = useState("gemini");
  const dispatch = useDispatch();
  const [messages, setMessages] = useState(Messages);
  const chatId = useSelector((state) => state.chat.selectedChatId);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
 const messagesContainerRef = useRef(null);
const handleNewChat = () => {
    const title = prompt('Enter chat title:');
    if (!title) return;

    console.log(title)
    dispatch (createNewchats(
      {
      tittle:title
    }
    ))
  
    
    
    
  };
  useEffect(() => {
    const handleAiResponse = (data) => {
      console.log("AI Response:", data);
      dispatch(addNewMessage({
        _id: Date.now().toString(),
        content: data.content,
        chat: chatId,
        role: "model",
        // aitype: selectedModel
      }));
      if(data){

        setLoading(false);  
      }
    };

    socketInstance.on("ai-repsonces", handleAiResponse);

  
     if (messagesContainerRef.current) {
  messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
}

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

    <div className="chat-slider-header flex items-center justify-between gap-4 px-20 py-12  ">
  {/* changed text color to white */}
  <span   className="font-mono px-10 font-semibold text-white">
    cyber-ai

  </span>
  {desktop&&
<div className="w-[30%] mr-[20%] border ">
    <select onChange={(e) => setSelectedModel(e.target.value)}
      className="rounded-lg w-full bg-transparent text-white px-3 py-1 focus:outline-none"
      
      defaultValue="gemini"
    >
      <option  className=' bg-[#414242] rounded-md' value="gemini">Gemini 2.0</option>
      <option className='bg-[#414242] rounded-md ' value="openai">OpenAI Model</option>
    </select>
  </div>
}
  {/* Profile section at end */}
  <div className="relative flex flex-col items-center justify-end">
    <button  className="focus:outline-none">
      <div className="w-10 h-10 mt-[3px] rounded-full border-2 border-[#b97b7b] flex items-center justify-center bg-[#232428]">
        {/* Empty circle for profile image */}
      </div>
    </button>
    <span className="mt-1 text-[#b97b7b] font-semibold text-base" style={{letterSpacing:'2px'}}>N P</span>
   
  </div>





</div>

        <div className="chat-slider-messages" ref={messagesContainerRef}>
        {Messages.length === 0 &&  selectedChatId === null ? (
  <div className="no-chat">No chat here</div>
) : (
 Messages.map((msg, idx) => (
  <div
    key={idx}
    className={`chat-message ${msg.role === 'user' ? 'user' : 'model'}`}
  >
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              style={dracula}
              language={match[1]}
              PreTag="div"
              {...props}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code className="bg-gray-800 text-pink-400 px-1 py-0.5 rounded">
              {children}
            </code>
          );
        },
      }}
    >
      {msg.content}
    </ReactMarkdown>
  </div>
))
)}

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
        <div style={{
          
        }} className="chat-slider-input">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
          >

          </input>
         {desktop ?
         <button className='inputbutton' onClick={handleSend}>Send</button>
         :
         <button className={`plusop ${open ? 'open' : ''}`} onClick={()=>setopen(!open)}>
           <span className="plus-icon"></span>
         </button>

         } 

         <div className={`menu-popup ${open ? 'visible' : ''}`}>
           <div onClick={handleNewChat} className="menu-item">
             <FiMessageSquare className="menu-icon" />
             <span>Create chat</span>
           </div>
           <div className="menu-item">
             <FiCpu className="menu-icon" />
             <span>Select model</span>
           </div>
         </div>

        </div>
      </div>
    </div>
  );
}








