// fibot
//fisetings

  import React, { useState, useRef, useEffect } from "react";
import "./ChatMessage.css";
import "./ButtonAnimation.css";
import { createNewchats } from "../../store/actions/chataction.jsx";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useDispatch, useSelector } from "react-redux";
import { addNewMessage } from "../../store/Slicees/chatSlice";
import { FiMessageSquare, FiCpu, FiSend, FiUser,  } from "react-icons/fi";
import { HiSparkles, HiLightningBolt } from "react-icons/hi";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function ChatMessages({
  Messages,
  socketInstance,
  socket,
  desktop,
  selectedChatId,
  userDetails
}) {
  const [open, setOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState("gemini");
  const [openModelPopup, setOpenModelPopup] = useState(false);

  const dispatch = useDispatch();
  const [messages, setMessages] = useState(Messages);
  const chatId = useSelector((state) => state.chat.selectedChatId);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const handleNewChat = () => {
    const title = prompt("Enter chat title:");
    if (!title) return;

    dispatch(
      createNewchats({
        tittle: title,
      })
    );
  };

  useEffect(() => {
    const handleAiResponse = (data) => {
      // console.log("AI Response 48:", data);
      dispatch(
        addNewMessage({
          _id: Date.now().toString(),
          content: data.content,
          chat: chatId,
          role: "model",
        })
      );
      
      if (data) {
        setLoading(false);
      }
    };

    socketInstance.on("ai-repsonces", handleAiResponse);

    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }

    return () => {
      socketInstance.off("ai-response", handleAiResponse);
    };
  }, [chatId, messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    setLoading(true);
    socket.emit("ai-message", {
      chat: chatId,
      content: input,
      model: selectedModel, // model bhej raha hai
    });
    
    dispatch(
      addNewMessage({
        _id: Date.now().toString(),
        content: input,
        chat: chatId,
        role: "user",
      })
    );
    setInput("");
  };

  const handleModelSelect = (model) => {
    setSelectedModel(model);
    setOpenModelPopup(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const models = [
    { id: 'gemini', name: 'Gemini Pro', icon: <HiSparkles />, color: 'bg-blue-500' },
    { id: 'gpt-4', name: 'GPT-4', icon: <HiLightningBolt />, color: 'bg-green-500' },
    { id: 'claude', name: 'Claude', icon: <FiCpu />, color: 'bg-purple-500' },
  ];

  return (
    <div className="flex flex-col h-full bg-[#212121]">
      {/* Header */}
      <div className="border-b border-[#2d2d2d] bg-[#212121] px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <img src="logo3.png" alt="" />
              <div className="text-white" size={16} />
            </div>
            <div>
              <h1 className="font-semibold text-gray-200">cyber-ai</h1>
              <p className="text-sm text-gray-400">
                {selectedModel === 'gemini' ? 'Gemini Pro' : 
                 selectedModel === 'gpt-4' ? 'GPT-4' : 'Claude'} <span className="text-green-400">•</span> Online
              </p>
            </div>
          </div>
          
          {/* Model Selector */}
          <div className="relative">
            <button
              onClick={() => setOpenModelPopup(!openModelPopup)}
              className="flex items-center gap-2 px-3 py-2 bg-[#2d2d2d] hover:bg-[#3d3d3d] text-gray-200 rounded-lg transition-colors duration-200"
            >
              <div className={`w-2 h-2 rounded-full ${models.find(m => m.id === selectedModel)?.color}`} />
              <span className="text-sm font-medium">
                {models.find(m => m.id === selectedModel)?.name}
              </span>
              <div size={14} />
            </button>
            
            {/* Model Dropdown */}
            {openModelPopup && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-[#2d2d2d] border border-[#3d3d3d] rounded-xl shadow-lg py-2 z-10">
                {models.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => handleModelSelect(model.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2 hover:bg-[#3d3d3d] transition-colors duration-200 ${
                      selectedModel === model.id ? 'bg-[#3d3d3d] text-blue-400' : 'text-gray-300'
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full ${model.color}`} />
                    <span className="text-sm font-medium">{model.name}</span>
                    {model.icon}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto px-4 py-6"
      >
        {!selectedChatId ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
              <FiMessageSquare className="text-white" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-gray-200 mb-2">How can I help you today?</h2>
            <p className="text-gray-400 mb-6 max-w-md">
              Choose a chat from the sidebar or create a new one to begin chatting with AI
            </p>
            <button
              onClick={handleNewChat}
              className="px-6 py-3 bg-[#2d2d2d] hover:bg-[#3d3d3d] text-gray-200 rounded-xl transition-colors duration-200 font-medium"
            >
              Start New Chat
            </button>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-6">
            {Messages && Messages.map((message) => (
              <div
                key={message._id}
                className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role !== 'user' && (
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="text-white" size={16} />
                  </div>
                )}
                
                <div className={`max-w-[80%] ${message.role === 'user' ? 'order-1' : ''}`}>
                  <div
                    className={`rounded-2xl px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-[#2d2d2d] text-gray-200 ml-auto'
                        : 'bg-transparent text-gray-200'
                    }`}
                  >
                    {message.role === 'user' ? (
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    ) : (
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          code({ node, inline, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || '');
                            return !inline && match ? (
                              <SyntaxHighlighter
                                style={dracula}
                                language={match[1]}
                                PreTag="div"
                                className="rounded-lg my-2"
                                {...props}
                              >
                                {String(children).replace(/\n$/, '')}
                              </SyntaxHighlighter>
                            ) : (
                              <code className=" text-green-600 px-1 py-0.5 rounded text-sm" {...props}>
                                {children}
                              </code>
                            );
                          },
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    )}
                  </div>
                </div>
                
              
              </div>
            ))}
            
            {loading && (
              <div className="flex gap-4 justify-start">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <div className="text-white" size={16} />
                </div>
                <div className="bg-transparent rounded-2xl px-4 py-3">
                  <div className="flex items-center gap-1">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                    <span className="text-gray-400 text-sm ml-2">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      {selectedChatId && (
        <div className="border-t border-[#2d2d2d] bg-[#212121] p-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Message cyber-ai..."
                className="w-full resize-none border border-[#3d3d3d] bg-[#2d2d2d] text-gray-200 placeholder-gray-500 rounded-2xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[52px] max-h-32"
                rows={1}
                disabled={loading} // loading ke wakt disapble hoga
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || loading}
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-xl transition-all duration-200 ${
                  input.trim() && !loading
                    ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg'
                    : 'bg-[#3d3d3d] text-gray-500 cursor-not-allowed'
                }`}
              >
                <FiSend size={16} />
              </button>
            </div>
            <div className="text-center mt-2">
              <p className="text-xs text-gray-500">
                cyber-ai can make mistakes. Check important info.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

