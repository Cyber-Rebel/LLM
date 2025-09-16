import React, { useState, useRef, useEffect } from "react";
import "./ChatMessage.css";
import "./ButtonAnimation.css";
import { createNewchats } from "../../store/actions/chataction.jsx";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useDispatch, useSelector } from "react-redux";
import { addNewMessage } from "../../store/Slicees/chatSlice";
import { FiMessageSquare, FiCpu } from "react-icons/fi";
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
      console.log("AI Response:", data);
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

  return (
    <div className="">
      <div
        style={{
          width: desktop ? "80%" : "100%",
        }}
        className={`chat-slider open`}
      >
        {/* Header */}
        <div className="chat-slider-header flex items-center justify-between gap-4 px-20 py-12">
          <span className="font-mono px-10 font-semibold text-white">
            cyber-ai
          </span>

          {desktop && (
            <div className="w-[30%] mr-[20%] border">
              <select
                onChange={(e) => setSelectedModel(e.target.value)}
                className="rounded-lg w-full bg-transparent text-white px-3 py-1 focus:outline-none"
                value={selectedModel}
              >
                <option
                  className=" bg-[#414242] rounded-md"
                  value="gemini"
                >
                  Gemini 2.0
                </option>
                <option
                  className="bg-[#414242] rounded-md "
                  value="openai"
                >
                  OpenAI Model
                </option>
              </select>
            </div>
          )}

          {/* Profile */}
          <div className="relative flex flex-col items-center justify-end">
            <button className="focus:outline-none">
              <div className="w-10 h-10 mt-[3px] rounded-full border-2 border-[#65aba9] flex items-center justify-center bg-[#232428]">
                <img src={`${userDetails.avatarimage}`} alt="" />
              </div>
            </button>
            <span
              className="mt-1 text-[#88bdf1] font-semibold text-base"
              style={{ letterSpacing: "2px" }}
            >
              {userDetails?.firstName[0]} {userDetails?.lastName[0]}
            </span>
          </div>
        </div>

        {/* Messages */}
        <div className="chat-slider-messages" ref={messagesContainerRef}>
          {Messages.length === 0 && selectedChatId === null ? (
            <div className="no-chat">No chat here</div>
          ) : (
            Messages.map((msg, idx) => (
              <div
                key={idx}
                className={`chat-message ${
                  msg.role === "user" ? "user" : "model"
                }`}
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
                        <code className="bg-gray-800 text-red-300 px-1 py-0.5 rounded">
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

        {/* Input */}
        <div className="chat-slider-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your message..."
          />

          {desktop ? (
            <button className="inputbutton" onClick={handleSend}>
              Send
            </button>
          ) : (
            <button
              className={`plusop ${open ? "open" : ""}`}
              onClick={() => setOpen(!open)}
            >
              <span className="plus-icon"></span>
            </button>
          )}

          <div className={`menu-popup ${open ? "visible" : ""}`}>
            <div onClick={handleNewChat} className="menu-item">
              <FiMessageSquare className="menu-icon" />
              <span>Create chat</span>
            </div>
            <div
              onClick={() => setOpenModelPopup(true)}
              className="menu-item"
            >
              <FiCpu className="menu-icon" />
              <span>Select model</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Model Selection */}
    {openModelPopup && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-[#1e1e1e] text-white p-6 rounded-2xl shadow-lg w-96">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Select AI Model
      </h2>

      {/* Select model */}
      <div className="flex flex-col gap-3">
        <button
          onClick={() => setSelectedModel("gemini")}
          className={`px-4 py-2 rounded-lg border ${
            selectedModel === "gemini"
              ? "bg-[#3d3d3d] border-blue-600"
              : "border-gray-500"
          }`}
        >
          Gemini 2.0
        </button>
        <button
          onClick={() => setSelectedModel("openai")}
          className={`px-4 py-2 rounded-lg border ${
            selectedModel === "openai"
              ? "bg-[#272727] border-green-600"
              : "border-gray-500"
          }`}
        >
          OpenAI
        </button>
      </div>

      {/* Footer buttons */}
      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={() => setOpenModelPopup(false)}
          className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            console.log("Confirmed model:", selectedModel);
            setOpenModelPopup(false);
          }}
          className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500"
        >
          OK
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}
