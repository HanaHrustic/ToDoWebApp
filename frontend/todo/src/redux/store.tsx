import { configureStore } from '@reduxjs/toolkit'
import toDoSlice from'./Slices/ToDo'

export const store = configureStore({
  reducer: {
    todo: toDoSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch