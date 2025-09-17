import React, {  useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {createNewchats, Messagesfetch } from '../store/actions/chataction.jsx'
import { HiOutlineMenuAlt1, HiPlus, HiChat, HiDotsVertical } from "react-icons/hi";
import { MdOutlineRestaurantMenu, MdDelete, MdEdit } from "react-icons/md";
import { FiMessageSquare, FiEdit3, FiTrash2, FiSearch, FiUser } from "react-icons/fi";
import { RiMessage3Line } from "react-icons/ri";
import './ChatSlider.css';

const ChatSlider = ({chats,selectedChatId,desktop, userDetails}) => {
  const[open ,setopen]= useState(false)
  const dispacth = useDispatch()
  
  const handleNewChat = () => {
    const title = prompt('Enter chat title:');
    if (!title) return;

    console.log(title)
    dispacth (createNewchats(
      {
      tittle:title
    }
    ))
  };

  const objectid=(data)=>{
    // alert(data._id) selectd object id madhe pass zali 
    // dispacth(selectedChatIde({
    //   selectedChatId:data._id
    // }))
    // console.log(data._id)
    dispacth (Messagesfetch(data._id))
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Today';
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const truncateTitle = (title, maxLength = 30) => {
    if (!title) return 'New Chat';
    return title.length > maxLength ? title.substring(0, maxLength) + '...' : title;
  };
  
  return (
    <>
      {/* Mobile Menu Button */}
      {!desktop && (
        <button
          onClick={() => setopen(!open)}
          className="fixed top-4 left-4 z-50 p-2 bg-[#2d2d2d] text-gray-300 rounded-lg hover:bg-[#3d3d3d] transition-colors duration-200"
        >
          {open ? <MdOutlineRestaurantMenu size={24} /> : <HiOutlineMenuAlt1 size={24} />}
        </button>
      )}

      {/* Overlay for mobile */}
      {!desktop && open && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setopen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        ${desktop ? 'relative' : 'fixed'} 
        ${desktop ? 'translate-x-0' : open ? 'translate-x-0' : '-translate-x-full'}
        ${desktop ? 'w-64' : 'w-64'}
        h-screen bg-[#171717] border-r border-[#2d2d2d] 
        transform transition-transform duration-300 ease-in-out z-40
        flex flex-col
      `}>
        {/* Header */}
        <div className="p-4 border-b border-[#2d2d2d]">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-lg font-semibold text-gray-200">cyber-ai</h1>
            {!desktop && (
              <button
                onClick={() => setopen(false)}
                className="p-1 hover:bg-[#2d2d2d] text-gray-400 rounded-md transition-colors duration-200"
              >
                <MdOutlineRestaurantMenu size={20} />
              </button>
            )}
          </div>
          
          {/* New Chat Button */}
          <button
            onClick={handleNewChat}
            className="w-full flex items-center gap-3 px-3 py-3 bg-[#2d2d2d] hover:bg-[#3d3d3d] text-gray-200 rounded-lg transition-all duration-200 group"
          >
            <HiPlus size={18} className="group-hover:rotate-90 transition-transform duration-200" />
            New chat
          </button>
        </div>

        {/* Navigation Items */}
        <div className="p-2 space-y-1 border-b border-[#2d2d2d]">
          <div className="flex items-center gap-3 p-3 text-gray-300 hover:bg-[#2d2d2d] rounded-lg cursor-pointer transition-colors">
            <FiSearch className="w-4 h-4" />
            <span className="text-sm">Search chats</span>
          </div>
          <div className="flex items-center gap-3 p-3 text-gray-300 hover:bg-[#2d2d2d] rounded-lg cursor-pointer transition-colors hover:cursor-not-allowed">
            <RiMessage3Line className="w-4 h-4" />
            <span className="text-sm">New Project</span>
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-2">
            {!chats || chats.length === 0 ? (
              <div className="text-center py-8">
                <RiMessage3Line size={32} className="text-gray-600 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">No conversations yet</p>
                <p className="text-gray-600 text-xs mt-1">Start a new chat to begin</p>
              </div>
            ) : (
              <div className="space-y-1">
                <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide px-3 py-2">
                  Today
                </h3>
                {chats.map((chat) => (
                  <div
                    key={chat._id}
                    onClick={() => objectid(chat)}
                    className={`
                      group relative cursor-pointer p-3 rounded-lg transition-all duration-200
                      ${selectedChatId === chat._id 
                        ? 'bg-[#2d2d2d] text-white' 
                        : 'text-gray-300 hover:bg-[#2d2d2d]'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3">
                          <RiMessage3Line size={16} className="flex-shrink-0" />
                          <span className="text-sm font-medium truncate">
                            {truncateTitle(chat.tittle || chat.title)}
                          </span>
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            // Add edit functionality
                          }}
                          className="p-1 hover:bg-[#3d3d3d] rounded transition-colors duration-200"
                          title="Rename chat"
                        >
                          <FiEdit3 size={12} className="text-gray-400" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            // Add delete functionality
                          }}
                          className="p-1 hover:bg-[#3d3d3d] rounded transition-colors duration-200 ml-1"
                          title="Delete chat"
                        >
                          <FiTrash2 size={12} className="text-gray-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer/User Section */}
        <div className="p-4 border-t border-[#2d2d2d]">
          <div className="flex items-center gap-3 p-3 text-gray-300 hover:bg-[#2d2d2d] rounded-lg cursor-pointer transition-colors">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
            <img src={`${userDetails.avatarimage}`} alt="" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{userDetails.firstName}</p>
              <p className="text-xs text-gray-500">Free plan</p>
            </div>
            <HiDotsVertical className="w-4 h-4" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatSlider;

