import React, {  useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {createNewchats, Messagesfetch } from '../store/actions/chataction.jsx'
import { HiOutlineMenuAlt1  } from "react-icons/hi";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { LuBadgePlus } from "react-icons/lu";
const ChatSlider = ({chats,selectedChatId,desktop}) => {
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
  
  
  return (
    <><div className='w-screen relative     ' >
    {
      desktop ? (
            <div>
      {/* Sidebar */}
      <div className="md:w-[20%]  h-screen bg-[#18191c] border-r border-[#333] flex flex-col">
        {/* Header */}
        <div className="px-3 pb-2 text-xs text-gray-400 font-semibold flex justify-between items-center">
          Chats
          <div className="flex gap-2">
            <button
              onClick={handleNewChat}
              className="px-10 py-10 bg-[#232428] rounded text-gray-300 hover:bg-[#343541] text-xs"
            >
              + New
            </button>
          
          </div>
        </div>

        {/* Chat list (scrollable) */}
        <div  className="flex-1 overflow-y-auto px-2">
          {chats.length === 0 && (
            <div className="text-gray-500 text-sm px-3 py-4">No chats yet</div>
          )}

          {chats.map((chat) => (
            <button
              key={chat?._id}
              onClick={()=>objectid(chat)}
              className={`w-full text-left px-3 py-2 rounded-lg mb-1 truncate transition font-medium ${
                chat._id === selectedChatId
                  ? 'bg-[#343541] text-white'
                  : 'text-gray-200 hover:bg-[#232428]'
              }`}
            >
    {chat.tittle}
            </button>
          ))}
        </div>
      </div>

     
    </div>
      ):(
      <>
      
        
        <div className='absolute z-10 w-[54%]     h-auto '>
          <div className='px-1 py-2'>
          <button 
  onClick={() => setopen(!open)} 
  className=" py-2 text-3xl text-black font-medium shadow-md   focus:outline-none     transition-all duration-300 ease-in-out"
>
  {open?<MdOutlineRestaurantMenu />:<HiOutlineMenuAlt1 />} 
</button>

{/* <button 
  onClick={handleNewChat} 
  className="ml-2 px-4 py-2 rounded-2xl bg-amber-400 text-black font-medium shadow-md hover:bg-amber-500 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all duration-300 ease-in-out"
>
  New Chat
</button> */}
          </div>
{open&&
           <div className=' bg-[#484956]'>
           <div className=' w-full h-screen'>
            {chats.map((chat) => (
            <button
              key={chat?._id}
              onClick={()=>objectid(chat)}
              className={` w-full flex overflow-x-hidden text-left px-3 py-2 rounded-lg mb-1  transition font-medium ${
                chat._id === selectedChatId
                  ? 'bg-[#343541] text-white'
                  : 'text-gray-200 hover:bg-[#232428]'
              }`}
            >
    {chat.tittle}
            </button>
          ))} 
          </div>
          </div>
          }
        </div>
        </>
      )
    }
    </div>
    </>
  );
};
// 
export default ChatSlider;

