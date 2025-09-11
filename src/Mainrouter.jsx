import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import Login from './page/Login.jsx';
import Home from './page/Home.jsx';
import Register from './page/Register.jsx';
import ChatMessages from './components/chat/ChatMessages.jsx';

const Mainrouter = () => (
    
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
             <Route path="/:MessageId" element={<Home />} />
            <Route path="/register" element={<Register />} />
        </Routes>

);

export default Mainrouter;


// userSlice dummey data
// import {createSlice} from '@reduxjs/toolkit'

// const initialState = {
//     chats: [ {
//             "_id": "68bbfa3a8d6c81e25f295f96",
//             "tittle": "Paitl@patil.com",
//         },
//         {
//             "_id": "68bbfd62a618dbaa69f5bd64",
//             "tittle": "kya hota agar wo hoti patil",
//         },
//     ],
//    selectedChatId:"68bbfd62a618dbaa69f5bd64" , // current open chat // defalut null hogi 
//     isSending: false,
//     Messages:[  

//                  {
//             "_id": "68bbfdc2a618dbaa69f5bd66",
//             "user": "68adbf6ac8423b28f10880cd",
//             "content": "Taking about redis databsase",
//             "chat": "68bbfd62a618dbaa69f5bd64",
//             "role": "user",
           
//         },
//         {
//             "_id": "68bbfdd0a618dbaa69f5bd69",
//             "user": "68adbf6ac8423b28f10880cd",
//             "content": "Okay, based on our recent conversation history focusing on Redis databases and \"AI shit\" (assuming that refers to AI applications and technologies), how can I help you? \n\nAre you looking for information on:\n\n*   **Combining Redis with AI applications?** (e.g., using Redis for caching AI model outputs, feature stores, real-time data ingestion for AI models)\n*   **The performance characteristics of Redis when used in AI-heavy workloads?**\n*   **Specific examples of AI projects that utilize Redis?**\n*   **Something else entirely related to Redis and AI?**\n\nPlease be more specific so I can provide a relevant response.\n",
//             "chat": "68bbfd62a618dbaa69f5bd64",
//             "role": "model",
          
//         }

//         ,                 {
//             "_id": "68bbfdc2a618dbaa69f5bd66",
//             "user": "68adbf6ac8423b28f10880cd",
//         "content": "Taking about Mobile",
//             "chat": "68bbfa3a8d6c81e25f295f96",
//             "role": "user",
           
//         },
//         {
//             "_id": "68bbfdd0a618dbaa69f5bd69",
//             "user": "68adbf6ac8423b28f10880cd",
//             "content": "Okay, based on our recent conversation history focusing on Mobile, how can I help you? \n\nAre you looking for information on:\n\n*   **Mobile app development?** (e.g., best practices, frameworks, languages)\n*   **Mobile device performance and optimization?**\n*   **Trends in mobile technology?**\n*   **Something else entirely related to Mobile?**\n\nPlease be more specific so I can provide a relevant response.\n",
//             "chat": "68bbfa3a8d6c81e25f295f96",
//             "role": "model",
          
//         }
//     ],
//   selectActiveChatMessages:[] 
// }

// const chatSlice = createSlice({
//     name: 'chat',
//     initialState,
//     reducers: {

//          createNewchat: (state, action) => {
//             const newChat = {
//         _id: Date.now().toString(), // temporary unique id
//         tittle: action.payload?.tittle || "New Chat",
//         };

//         state.chats.push(newChat);

//          },
//          selectedChatIde: (state, action) => {   
//             state.selectedChatId = action.payload.selectedChatId;
//         },

//         // activechat messages  
//         activeChatMessages: (state) => {
//       if (!state.selectedChatId) [];
//        state.Messages.filter(msg => msg.chat === state.selectedChatId);
//     },

//        addNewMessage: (state, action) => {
//         if (!state.selectedChatId) return;  // No chat selected, do nothing
        
//             console.log(action.payload.role)
//         state.Messages.push(action.payload);
//     // }
//         },
        
        
//                 // setIsSending: (state, action) => {
//                 //     state.isSending = action.payload;
//                 // },
        

// }})
// export const { createNewchat ,selectedChatIde ,activeChatMessages,addNewMessage } = chatSlice.actions
// export default chatSlice.reducer
// STATE MATLAB INITAAL DATA ]
// ACTION  = MATLAB CHANGE ABLE DATA
// REDUCER =  ACTION KO  STATE ME LAGANE KA TARIKA
// DISPATCH =  ACTION KO CALL KARNE KA TARIKA   

// Termitucal hota hae ki ai model kitna creative anserwer de but kabhi kabhi createive hone ke chakkar me ai model galat anserwer de deta hae  isko hum log temperature se control karte hae 0.1 se 2.0 tak hota hae 1.0 normal hota hae jitna kam hoga utna hi ai model safe anserwer dega


// let m =[]
// m.push(12)
// console.log(m)