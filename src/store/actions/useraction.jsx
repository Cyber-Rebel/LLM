import axios from 'axios'
import { setUser, clearUser } from '../Slicees/userSlice.jsx'


export const loginUser = (data) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:3000/api/auth/login', data,{withCredentials:true})
    // console.log("the line 7n",response.data.user)
    const userData = response.data.user
    dispatch(setUser({
      id: userData.id,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      avatarimage:userData.avatarsUrl,
    }),
  )
  return response.data.user // Return user data for further use
  } catch (error) {
    console.error('Login failed:', error)
     return  { error: true, message: error.response?.data?.message || "Login failed" };
  
  }
}

export const registerUser = (data)=> async (dispatch)=>{
  try{
    const reponser= await axios.post("http://localhost:3000/api/auth/register",data,{withCredentials:true})
    // console.log("the line 34",reponser.data)
    const userData = reponser.data.user
    dispatch(setUser({
      id: userData.id,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      avatarimage:userData.avatarsUrl,
    }))
  return reponser.data.user // Return user data for further use


    
  }catch(err){
    console.log(err)
    return { error: true, message: "Register Error"  };
  

  }

}
export const  authenticateUser = () => async (dispatch) => {
  try{
    const response = await axios.get('http://localhost:3000/api/auth/me',{withCredentials:true})
    console.log("the line 60",response.data)
    const userData = response.data.user
    console.log("the line 62",userData)
    dispatch(setUser({
      id: userData.id,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      avatarimage:userData.avatarsUrl,
    }))
    return response.data.user // Return user data for further use
 

  }catch(err){
    console.log("The erro IN api /me",err)
    return { error: true, message:"Authenticate Error"  };
  }
}



// export const asyncUserRegister = (user) => async (dispatch) => {
//   try {
//     const res = await axios.post("http://localhost:3000/api/auth/register", user)
//     console.log("Register Response:", res.data)

//     dispatch(setUser({
//       isAuthenticated: true,
//       token: res.data.token,
//       id: res.data.id,
//       name: res.data.name,
//       email: res.data.email,
 
//     }))


//   } catch (err) {
//     console.error("Register Error:", err)
//   }
// }




// // https://avatar.iran.liara.run/username?username=Scott+Wilson
// // action madhe sare api call karne hai