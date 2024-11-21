import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    tasks: [],
    ids:[],
    maxsayfa:1
}

export const taskSlice = createSlice({
    name:'Task',
    initialState,
    reducers:{
        setTasks:(state,action)=>{
            state.tasks = action.payload
        },
        setIds: (state,action)=>{
            state.ids = action.payload
        },
        setMaxsayfa:(state,action)=>{
            state.maxsayfa = action.payload
        }

    }
})


export const { setTasks, setIds,setMaxsayfa } = taskSlice.actions

export default taskSlice.reducer