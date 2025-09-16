  import { use, useEffect, useState } from "react";
import ChatSlider from "../components/ChatSlider.jsx";
import ChatMessages from "../components/chat/ChatMessages.jsx";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { Chatfetch, Messagesfetch } from "../store/actions/chataction.jsx";
import {authenticateUser} from "../store/actions/useraction.jsx"

const Home = () => {
  const [desktop,setdesktop ] = useState(window.innerWidth >= 768); // Example: true if width >= 768px 1089>768 1089 sppose laptop
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);
  const userDetails = useSelector((state) => state.user);
  console.log(userDetails)
  let { selectedChatId, chats, Messages } = useSelector((state) => state.chat);
  const socketInstance = io("http://localhost:3000/", {
    withCredentials: true,
  });
  
  console.log("Selected Chat ID:", selectedChatId);
  useEffect(() => {
    // console.log("Active Chat Messages:", activeMessages);
    dispatch(Chatfetch());
   dispatch(authenticateUser())

    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      console.warn("Connected to server socket ");
    });
    window.addEventListener('resize',()=>{
      setdesktop(window.innerWidth >= 768)
    })
    
    
    return () => {
      setSocket(null);
    };
  }, []);

console.log(desktop)


  return (
    <> 
    <ChatSlider desktop={desktop} chats={chats} selectedChatId={selectedChatId} />
      <ChatMessages desktop={desktop} userDetails={userDetails} Messages={Messages} socketInstance={socketInstance} socket={socket} selectedChatId={selectedChatId}    />
    </> 
  );
};

export default Home;

// selcetedChatId == null tar create chat or Select chat dakhana hae