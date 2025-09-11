import { useEffect, useState } from "react";
import ChatSlider from "../components/ChatSlider.jsx";
import ChatMessages from "../components/chat/ChatMessages.jsx";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { Chatfetch, Messagesfetch } from "../store/actions/chataction.jsx";

const Home = () => {
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);
  let { selectedChatId, chats, Messages } = useSelector((state) => state.chat);
  console.log("Selected Chat ID:", selectedChatId);

  const socketInstance = io("http://localhost:3000/", {
    withCredentials: true,
  });

  useEffect(() => {
    // console.log("Active Chat Messages:", activeMessages);
    dispatch(Chatfetch());

    setSocket(socketInstance);
   

      // Test the socket connection
      // socketInstance.on('sey',(data)=>{
      //   console.log("s:-",data)
      //   socket.emit('frontend',{msg:"hello server"})
      // })


    socketInstance.on("connect", () => {
      console.warn("Connected to server socket ");
    });

    
    
    return () => {
      setSocket(null);
    };
  }, []);




  return (
    <>
      <ChatSlider chats={chats} selectedChatId={selectedChatId} />
      
      <ChatMessages  Messages={Messages} socketInstance={socketInstance} socket={socket}    />
    </>
  );
};

export default Home;

// Listern karne ke liye socketInter ((io){iomatalb pura server})
//  emit karne ke liye socket.emit
// const activeMessages = useSelector(state =>
//   state.chat.Messages.filter(msg => msg.chat === state.chat.selectedChatId)
// );
