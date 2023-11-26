import {createSlice} from '@reduxjs/toolkit'
import { dataType } from '../../Pages/ImagePage'

interface intialStateType{
    images:dataType[]
}

const initialState:intialStateType ={
    images:[]
}

const dataSlice = createSlice({
    name:'data',
    initialState,
    
    reducers:{
        addImages:(state,{payload})=>{
            state.images.push(payload)
        }
    }
})

export const {addImages} = dataSlice.actions
export const getAllMovies = (state:any) =>state.data.images
export default dataSlice.reducer