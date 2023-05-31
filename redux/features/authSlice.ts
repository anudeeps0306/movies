import { createSlice } from "@reduxjs/toolkit";
import {Signin}  from "../../interface";

export interface AuthState{
    authInfo: Signin;
}


const initialState: AuthState = {
    authInfo: {
        email: "",
        password: "",
        name: "",
        profilePic: "",
    }
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthInfo: (state, action) => {
            if(action.payload.email !== state.authInfo.email)
            state.authInfo = action.payload;
        },
        removeAuthInfo: (state) => {
            state.authInfo = {
                email: "",
                password: "",
                name: "",
                profilePic: "",
            }
        }
    }
})


export const {setAuthInfo, removeAuthInfo} = authSlice.actions;
export default authSlice.reducer;