import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentUser: null,
    loading: false,
    error: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
        state.loading = true
    },
    loginSuccess: (state, action) => {
        state.loading = false
        state.currentUser = action.payload
    },
    loginFail: (state) => {
        state.loading = false
        state.error = true
    },
    logOut: () => {
        return initialState
    },
    subscription: (state, action) => {
        if(state.currentUser.subscribedChannels.includes(action.payload)){
            state.currentUser.subscribedChannels.splice(
                state.currentUser.subscribedChannels.findIndex(
                    (channelId) => channelId === action.payload
                ),
                1
            )
        }
        else{
            state.currentUser.subscribedChannels.push(action.payload)
        }
    },
    updateStart: (state) => {
        state.loading = true
    },
    updateSuccess: (state, action) => {
        state.loading = false
        state.currentUser = action.payload
    },
    updateFail: (state) => {
        state.loading = false
        state.error = true
    },
  },
})

// Action creators are generated for each case reducer function
export const { loginStart, loginSuccess, loginFail, logOut, subscription, updateStart, updateSuccess, updateFail} = userSlice.actions

export default userSlice.reducer