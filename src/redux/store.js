import { configureStore } from '@reduxjs/toolkit'

import authSlice from './authSlice'
import taskSlice from './taskSlice'
import filterSlice from './filterSlice'

export const store = configureStore({
  reducer: {
    auth:authSlice,
    task:taskSlice,
    filter:filterSlice
  },
})