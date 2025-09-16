import React, { useEffect } from 'react'
import Mainrouter from './Mainrouter.jsx'
import { useSelector } from 'react-redux'

const App = () => {
  const userdata= useSelector(state=>state.user)
  //  console.log("userdata",userdata)
  console.log("isAuthenticated",userdata?.id)
  return (
    <>
   
   <Mainrouter/>
   </>
  )
}

export default App

// useEffect(() => {
//   // Fetch chats when the component mounts
//   dispatch(Chatfetch()) when not here becausee ese par agar user login nahi bhi huva to app useeffect to chaelga to fetch kya hoga token nahi huva to best ki tum ese home try karo 
 // }, [])