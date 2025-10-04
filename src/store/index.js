import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "./slices/notesSlice"


const noteStore = configureStore({
    reducer: {
        notes: noteReducer,
    }
});

export default noteStore;