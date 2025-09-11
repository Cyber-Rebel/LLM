import {createSlice} from '@reduxjs/toolkit'
       
const initialState = {
  isAuthenticated: false,
  token: "",
  id: null,
  firstName: "",
  lastName: "",
  email: "",
  // avatar: "",
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      
    },



       clearUser: (state) => {
      state.isAuthenticated = false;
      state.token = "";
      state.id = null;
      state.firstName = "";
      state.lastName = "";
      state.email = "";
   
    }


    },})

export const { setUser,clearUser } = userSlice.actions
export default userSlice.reducer

// userSlice.actions ka matlab reducers ko export karna hai