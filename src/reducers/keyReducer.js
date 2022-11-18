import { createSlice } from "@reduxjs/toolkit";

export const keySlice = createSlice({
    name: 'keySlice',
    initialState: {
        value: {
            publicKey: null,
            secret: null
        }
    },
    reducers: {
        logOut: state => {
            state.value.publicKey = null
            state.value.secret = null
        },
        addPublicKey(state, action) {
            state.value.publicKey = action.payload
        },
        addSecret(state, action) {
            state.value.secret = action.payload
        }
    }
})

export const { logOut, addPublicKey, addSecret } = keySlice.actions

export default keySlice.reducer