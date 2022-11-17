import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
    name: 'loginState',
    initialState: {
        value: {
            logged: false,
            uid: ""
        }
    },
    reducers: {
        logIn: state => {
            state.value.logged = true
        },
        logOut: state => {
            state.value.logged = false
        },
        addUID(state, action) {
            state.value.uid = action.payload
        },
        removeUID: state => {
            state.value.uid = ""
        }
    }
})

export const { logIn, logOut, addUID, removeUID } = loginSlice.actions

export default loginSlice.reducer