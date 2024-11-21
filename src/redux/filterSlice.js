import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    search: "",
    siralama:true, //true -> Baştan Sona ----- false -> Sondan Başa
    selectId:0,
    sayfa:1
}

export const filterSlice = createSlice({
    name:'filter',
    initialState,
    reducers:{
        setSearch:(state,action)=>{
            state.search = action.payload
        },
        setSiralama: (state,action)=>{
            state.siralama = action.payload
        },
        setSelectId:(state,action)=>{
            state.selectId = action.payload
        },
        setSayfa:(state,action)=>{
            state.sayfa = action.payload
        }
    }
})


export const { setSearch, setSiralama, setSelectId,setSayfa } = filterSlice.actions

export default filterSlice.reducer