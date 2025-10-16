import { configureStore } from '@reduxjs/toolkit'
import StudentSlice from './studentSlice'
const store = configureStore({
    reducer: StudentSlice 
})

export default store