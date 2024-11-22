import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    //Giriş Yapılı mı?
    isAuth: false,
    //Token
    token:"",
    //Kullanıcı Adı
    user:"",
    //Api URL
    url: "http://localhost:5070/api/"
}

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setIsAuth:(state,action)=>{
            state.isAuth = action.payload
        },
        setToken: (state,action)=>{
            state.token = action.payload
        },
        setUser:(state,action)=>{
            state.user = action.payload
        }
    }
})


export const { setIsAuth, setToken, setUser } = authSlice.actions

export default authSlice.reducer