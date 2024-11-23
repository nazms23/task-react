import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    /*
    *Api URL
    ! Sonunda "/" olmasına dikkat edin
    ? Örn -> http://localhost:XXXX/api/ <-- 
    */
    url: "http://localhost:5070/api/"
}

export const apiSlice = createSlice({
    name:'Api',
    initialState,
    reducers:{

    }
})


export const {} = apiSlice.actions

export default apiSlice.reducer