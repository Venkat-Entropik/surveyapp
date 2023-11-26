import {configureStore } from '@reduxjs/toolkit'
import dataReducer from './redux/dataSlice'

export const store = configureStore({
    reducer:dataReducer,
    devTools: process.env.NODE_ENV !== 'production',
})